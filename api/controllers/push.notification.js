const webpush = require('web-push')


const publicVapiKey = 'BES_f-0tI2EFXyniRgEsYFS8IuSVoSU5HUrWdvrim65wjZDD4FQSxf-AyySg74ds9vL4rdJp9nHLic64OSboLZw'
const privateVapiKey = '4EZpr-tfdiyXVQxZDm-Nt4imNTv7XLWkIUijjEmwkmE'
webpush.setVapidDetails('mailto:tung24041998@gmail.com', publicVapiKey, privateVapiKey);

module.exports = {
    pushNotification: (req, res) => {
        const body = req.body

        const payload = JSON.stringify({ title: 'Push test' })
        webpush.sendNotification(body, payload).catch(err => console.error(err + ''))
    },
}
