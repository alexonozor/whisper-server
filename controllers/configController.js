module.exports = {
    getConfig: (req, res) => {
        config = {
            SHARE_PHOTO_URL: 'www.whisper.com',
            STORE_URL: 'market://details?id=www.wishper',
            IOS_NUMBER: '12345433',
            ANDRIOD_MARKET_DETAILS: 'market://details?id=www.wishper',
            WHISPER_LOGO_URL: 'WWW',
            LOADER_URL: 'WWWW'
        }
        res.json({ success: true, config, status: 200 })
    }
}
