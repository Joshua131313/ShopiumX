import React from 'react'
import GooglePayButton from '@google-pay/button-react'

const Googlepay = () => {

  return (
    <div className="googlepay">
      <GooglePayButton 
        environment="PRODUCTION"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA', "AMEX"],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: 'BCR2DN6TR7Y7X3JF',
            merchantName: 'ShopiumX',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '0.01',
            currencyCode: 'CAD',
            countryCode: 'CA',
          },
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('load payment data', paymentRequest);
        }}
      />
    </div>
  )
}
export default Googlepay