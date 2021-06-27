import { db } from "./Fire"
import firebase from 'firebase'

export function formatPrice(price) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  
  return formatter.format(price)
}

export const writeUserdocuments = (user, email, name, cover='') => {
  
  const customization =  {
    themecolor: "#9d65c9",
    darkmode: false,
    gridview: false,
    hidenav: false,
    secondtheme: '#5d54a4'
  }
  db.collection('orders').doc('orders').onSnapshot(snap=>{
    const orders = snap.data().orders
    const geustorders = JSON.parse(localStorage.getItem('orders')) || []
    geustorders.forEach((curr) => {
      const { orderid } = curr
      const isExist = orders.find((obj) => obj.orderid === orderid)
      
      if (isExist) isExist.userid = user.uid
    })

    geustorders && db.collection('orders').doc('orders').update({
      orders: orders
    })
    
  })
  db.collection('users').doc(user.uid).set({
    created: new Date(),
    uid: user.uid,
    userinfo: {
      name: name,
      cover: cover,
      age: '',
      phone: '',
      email: email,
      uid: user.uid,
    },
    customization,
    saved: JSON.parse(localStorage.getItem('saved')) || [], 
    cart: JSON.parse(localStorage.getItem('incart')) || [],
    compared: JSON.parse(localStorage.getItem('compared')) || [],
    saveforlater: JSON.parse(localStorage.getItem('savedforlater')) || [],
    shippinginfo: [],
    defaultshipping: '',
    cards: [],
  }).then(()=>{
    localStorage.clear()
  })
  db.collection('allusers').doc('allusers').update({
    users: firebase.firestore.FieldValue.arrayUnion(user.uid)
  })
}

export function removeFromCart(cartitem, user) {

    db.collection('users').doc(user.uid).update({
      cart: firebase.firestore.FieldValue.arrayRemove(cartitem)
    })
  
}
export function updateCart(incart, user) {
  db.collection('users').doc(user.uid).update({
    cart: incart
  })
}
export function sumCost(incart, products) {
  return (incart?.reduce((acc, {id, qty})=> 
  (acc+qty)*(products.price), 0))
}

export function referProduct(array, id) {
  return array.find(x=> x.id === id)
}
export function getStockByColorAndSize(color, size, product) {
  return product?.sizes.find(x => x.size === size)?.colors.find(x=> x.color === color)?.stock
} 
export function getColorsBySize(size, product) {
  return product?.sizes.find(x=> x.size === size)?.colors
}
export function getRating(reviews) {
  const rating =  (reviews?.reduce((n, {rating})=> n + rating, 0))/reviews?.length
  return (isNaN(rating)?0:rating)
}

export function filterLowToHigh (allproducts) {
  return allproducts.sort((a, b)=> a.price - b.price)
}

export function filterHighToLow (allproducts) {
  return allproducts.sort((a, b)=> b.price - a.price)
}
export function filterHighRating(allproducts) {
  return allproducts.sort((a, b)=> getRating(b.reviews) - getRating(a.reviews))
}
export function filterHighSale(allproducts) {

  return allproducts.sort((a, b)=> b.percent - a.percent)
} 
export function determineInArray(array, color, size, product) {
 return (array?.some(x=> (x.id === product.id) && x.color === color && x.size === size))
}
export function totalPrice(incart, allproducts, appliedcodes, percentoff) {
  const totalwithoutcoupons = ((incart?.reduce((acc, {id, qty}) => acc + qty * (allproducts.filter(x=> incart?.some(el=> x.id === el.id))).find(x => x.id === id)?.price, 0))*((100 - percentoff)/100))
  const couponsdiscounts = appliedcodes?.reduce((n, {discount}) => n + discount, 0)
 if(totalwithoutcoupons < couponsdiscounts) {
   return 0
 }
 else {
   return totalwithoutcoupons - couponsdiscounts
 }
}
export function sumSales(orders) {
  let sum = 0

  orders.forEach(order=> {
    order.orderinfo.products.forEach(item=> {
       sum += item.price*item.qty
    })
  })
  return sum
}
export function sumExpenses(orders, allproducts) {
 let cost = 0
  orders.forEach(order=> {
    order.orderinfo.products.forEach(item=> {
      allproducts.forEach(product=> {
        if(item.id === product.id) {
          cost += product.cost * item.qty
        }
      })
    })
  })
  return cost
}
export function totalPriceWithTax(incart, allproducts, appliedcodes, percentoff, tax, shipping){
  return (totalPrice(incart, allproducts, appliedcodes, percentoff) * (1+tax))+(shipping??0)
}
export function getInCartProducts(allproducts, incart) {
  return allproducts.filter(x=> incart.some(el=> el.id === x.id))
}
export function getDiscountDollarFromCode(allproducts, code, incart) {
  return getInCartProducts(allproducts, incart).filter(x=>x.coupons.find(x=> x.couponcode === code))[0].coupons.find(x=> x.couponcode === code).discount*getInCartProducts(allproducts, incart).filter(x=>x.coupons.find(x=> x.couponcode === code)).length
}
export function getProvinces(country) {}
 //  console.log(allproducts.sort((a, b)=> a.price - b.price))
  //  console.log(allproducts.sort((a, b)=> b.percent - a.percent))
  //  console.log(allproducts.sort((a, b)=> getRating(b.reviews) - getRating(a.reviews)))
  //  console.log(allproducts.sort((a, b)=> b.price - a.price))
  export function convertDateToString(date, weekday) {
    if(!weekday) {
      return date?.toLocaleString('en-US', {  year: 'numeric', month: 'long', day: 'numeric' })
    }
    else {
      return date?.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
  }
export function placeOrder(
  name, lastname, 
  company, email, 
  city, street, 
  zip, unit, 
  incart, extradetail, 
  paymenttype, appliedcodes, 
  user, selectedshipping, 
  allproducts, totalpricewithcoupons,
  orderid, percentoff, rate,
  shippinginfo, updateOrders,
  giftcardsamount
  ) {
  incart.forEach(product=> {
    product.price = allproducts.find(x=> x.id === product.id ).price
  })

  const orderobject = {
  
    shippinginfo,
    ordercost: totalpricewithcoupons,
    giftcardsamount: giftcardsamount,
     orderinfo: {
       products: incart,
       extradetail,
       paymenttype: paymenttype,
     },
     selectedshipping: selectedshipping,
     couponsused: appliedcodes, 
     percentoff: percentoff, 
     rate: rate,
     updates: [
       {
       status: 'Ordered', 
       details: 'Order was placed on '+convertDateToString(new Date()),
       date: new Date()
      }
     ],
     orderid: orderid,
     date: new Date(),
     type: 'order',
     trackingid: {
       id: '',
       carrier: '',
       delivery: ''
     },
     userid: user?user.uid:'geust',
     viewed: false 
   }

  const writeOrder = (doc) => {
    incart.forEach((curr) => {
      const { id, color, qty, size } = curr
      const isExist = allproducts.find((obj) => obj.id === id);
      if (isExist) {
        const stockObj = isExist.sizes.find((s) => s.size === size);
        isExist.sold += qty
        if (stockObj) {
          const colorObj = stockObj.colors.find((c) => c.color === color);
          if (colorObj) colorObj.stock -= qty
        }
      }
    })
    db.collection('orders').doc('orders').update({
      orders: firebase.firestore.FieldValue.arrayUnion(orderobject)
    })
    db.collection('products').doc('products').update({
      products: allproducts
    })


  }
    
     writeOrder()
     if(!user) {
        updateOrders(orderobject)
     }

}
export function formatMoney(money) {
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2 }).format(money)
}
export function sortSizes(sizes) {
  const ORDER = ['one size', 'xxs', 'xs', 's', 'm','l', 'xl', '2xl', 'xxl'];

sizes.sort((a,b) => {
    a = a.size.toLowerCase();
    b = b.size.toLowerCase();
    
    let nra = parseInt(a);
    let nrb = parseInt(b);
    
    if ((ORDER.indexOf(a)!=-1)) nra = NaN;
    if ((ORDER.indexOf(b)!=-1)) nrb = NaN;
  
    if (nrb===0) return 1;
    if (nra&&!nrb || nra===0) return -1;
    if (!nra&&nrb) return 1;
    if (nra && nrb) {
        if (nra==nrb) {
            return (a.substr((''+nra).length)).localeCompare((a.substr((''+nra).length)));
        } else {
            return nra-nrb;
        }
    } else {
        return ORDER.indexOf(a) - ORDER.indexOf(b);
    }
});

  return sizes
}
export function getUser(allusers, id) {

  return allusers.find(x=> x === id)
}
export   var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['warn'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.warn;
                            window['console']['warn'] = function() {};
                        };

    return pub;
}();
export function sortArr(array, sort) {

  let bucketed = array.reduce((acc, x)=> {
    let pivot = x[sort]
    let currentVals 
    if(sort === 'date') {
      currentVals = ((acc?.hasOwnProperty(convertDateToString(pivot.toDate(), true))) )? acc[convertDateToString(pivot.toDate(), true)] : []
    }
    else {
      currentVals = (acc?.hasOwnProperty(pivot))? acc[pivot] : []

    }
    currentVals.push(x)
    acc[sort==='date'?convertDateToString(pivot.toDate(), true):pivot] = currentVals
    return acc 
  }, {})
  return bucketed
}