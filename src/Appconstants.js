export  const links = [
    {
      link: '/men',
      icon: 'fad fa-home',
      exact: true,
      text: 'Men'
    },
    {
      link: '/women',
      icon: 'fad fa-shopping-bag',
      text: 'Women'
    },
    {
      text: 'Kids',
      link: '/kids',
    }
]
export const links2 = [
  {
    link: '/shop',
    icon: 'fad fa-sparkles',
    text: 'Shop'
  },

  {
    text: 'Arrivals',
    link: '/arrivals'
  },
  {
    link: '/sales',
    text: 'Sales',
    icon: 'fad fa-tags'
  },
]
export const alllinks = [
 
  {
    link: '/shop',
    icon: 'fad fa-sparkles',
    text: 'Shop', 
    breadcrumbs: {
      link: [{text: 'Home', link: 'website'}, {text: 'Shop', link: 'website/shop'}],
      title: 'Shop'
    },
    filterby: '',
  },

  {
    text: 'Arrivals',
    link: '/arrivals',
    breadcrumbs: {
      link: [{text: 'Home', link: 'website'}, {text: 'New Arrivals', link: 'website/arrivals'}],
      title: 'New Arrivals'
    },
    filterby: 'arrivals'
  },
  {
    link: '/sales',
    text: 'Sales',
    icon: 'fad fa-tags',
    breadcrumbs: {
      link: [{text: 'Home', link: 'website'},{text: 'Sales', link: 'website/sales'}],
      title: 'Sales'
    },
    filterby: 'sale',

  }, 
  {
    link: '/men',
    icon: 'fad fa-home',
    exact: true,
    text: 'Men',
    breadcrumbs: {
      link: [{text: 'Home', link: 'website'}, {text: 'Men', link: 'website/men'}],
      title: 'Men'
    },
    filterby: 'men',

  },
  {
    link: '/women',
    icon: 'fad fa-shopping-bag',
    text: 'Women',
    breadcrumbs: {
      link: [{text: 'Home', link: 'website'}, {text: 'Women', link: 'website/women'}],
      title: 'Women'
    },
    filterby: 'women'
  },
  {
    text: 'Kids',
    link: '/kids',
    breadcrumbs: {
      link: [{text: 'Home', link: 'website'}, {text: 'Kids', link: 'website/kids'}],
      title: 'Kids'
    },
    filterby: 'kids',
  },
]
export const slides = [
  
  {
    subtitle: "Shop Trending T-Shirts that are now on sale!",
    title: "T-SHIRTS SALE",
    link: '/shop/shirts/sales',
    img: 'https://i.imgur.com/0ASbjos.jpg',
    position: 1,
    class: 'white',
    btntext: 'Shop Now'
  },
  {
    subtitle: "Shop exclusive ladies bags now on ShopiumX",
    title: "LADIES BAGS",
    link: '/shop/bags',
    img: 'https://i.imgur.com/h0EVY1R.jpg',
    position: 2,
    img2: 'https://i.imgur.com/XDkA4cv.png',
    class: 'leftimg',
    btntext: 'Shop Now'
  },
  {
    title: 'New Arrivals 2021',
    subtitle: 'Discover New Arrivals',
    link: '/new-arrivals',
    img: 'https://i.imgur.com/hdeCel6.jpg',
    position: 3,
    class: 'center',
    btntext: 'Discover Now'
  }
]
export const prices = [
     '$0-$49',
     '$50-$99',
     '$100-$149',
     '$150-$199',
     '199-300',
     '$300-$500',
]
export const allsizes = [
  'XS', 'S', 'M',
  'L', 'XL'
]
export const allsizesstength = [
  {
    size: 'XS',
    val: 1
  },
  {
    size: 'S',
    val: 2
  },
  {
    size: 'M',
    val: 3
  },
  {
    size: 'L',
    val: 4
  },
  {
    size: 'XL',
    val: 5
  }
]
export const ratings = [
   5, 4, 3, 2, 1
]
export const colors = [
  'black', 'red', 'green', 'blue', 'orange', 'yellow', 'Navy',
  'gray', 'brown'
]
export const seasons = [
   'Fall', 'Winter', 'Spring', 'Summer'
]
export const filters = [
  'Popularity',
  'Price Low to High',
  'Price High to Low',
  'Rating'
] 
export const genders = [
  'Women', 'Men', 'Kids'
]

export const benefits = [
  {
    icon: 'fal fa-shopping-cart',
    title: 'Free Shipping',
    text: 'Free Shipping on all orders over $50!'
  },
  {
    icon: 'fal fa-credit-card',
    title: 'Secure Payment',
    text: "Shop with Safety and Security"
  },
  {
    icon: 'fal fa-wallet',
    title: '100% Satisfaction',
    text: '30 day money back guarantee'
  },
  {
    icon: 'fal fa-comment',
    title: 'Customer Service',
    text: 'Reliable cusomer servie'
  }
]
export const columns = [
  {
    title: 'Shop',
    links: alllinks
  },
  {
    title: 'Account',
    links: [
      {
        text: 'My Account',
        link: '/account',
      },
      {
        text: 'Purchases',
        link: '/orders',
      },
      {
        text: 'Cart',
        link: '/cart'
      },
      {
        text: 'Saved',
        link: '/saved'
      }
    ]
  },
  {
    title: 'Help',
    links: [
      {
        text: 'Track Order',
        link: '/track'
      },
      {
        text: 'Shipping and Returns',
        link: '/shipping'
      }, 
      {
        text: 'Customer Service',
        link: '/customerservice'
      }
    ]
  },
  {
    title: 'Policies',
    links: [
      {
        text: 'About',
        link: 'about'
      },
      {
        text: 'Privacy Policy',
        link: 'privacy'
      },
      {
        text: 'Contact',
        link: 'contact',
      },
      {
        text: 'Terms & Conditions',
        link: 'terms'
      },

    ]
  }
]
export  const colornames = [
  "Beige",
  "Black",
  "Blue",
  "Brown",
  "Gray",
  "Grey",
  "Green",
  'Red',
  'Purple',
  'Navy',
  'Burgundy',
  'White',
  'Yellow'
];
export const orderstatus = [
  {
    status: 'Ordered',
    percent: 0,
    icon: 'fa fa-bags-shopping'
  }
  ,{
    status: 'Received',
    percent: 18,
    icon: 'fa fa-check'
  },
  {
    status: 'Shipped',
    percent: 45,
    icon: 'fa fa-truck',
  },
  {
    status: 'In Transit',
    percent: 78,
    icon: 'fa fa-truck-moving'
  },
  {
    status: 'Delivered',
    percent: 100,
    icon: 'fa fa-box-check'
  }
]
export const giftcardtemplates = [
  {id: 'templateone', img: 'https://i.imgur.com/6ikTqFA.jpg'}, 
  {id: 'templatetwo', img: 'https://i.imgur.com/4mJkU1A.jpg'}, 
  {id: 'templatethree', img: ''},
  {id: 'templatefour', img: 'https://i.imgur.com/sVgWO1B.jpg'}
]