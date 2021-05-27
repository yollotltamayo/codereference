module.exports ={
    async rewrites() {
        return  {
            fallback: [
                {
                    source: '/:path*',
                    destination: `http://localhost:8000/:path*`,
                },
            ]
        }
    },
}

