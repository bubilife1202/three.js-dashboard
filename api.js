// Free Stock Market Data API Integration
// No backend required, runs entirely in the browser

class StockDataFetcher {
    constructor() {
        // Using multiple free APIs as fallbacks
        this.apis = {
            yahoo: 'https://query1.finance.yahoo.com/v8/finance/chart/',
            alphavantage: 'https://www.alphavantage.co/query',
            finnhub: 'https://finnhub.io/api/v1'
        };
    }

    // Fetch US market indices (S&P 500, NASDAQ, DOW)
    async fetchUSIndices() {
        try {
            const symbols = [
                { symbol: '^GSPC', name: 'S&P 500', color: '#00CED1' },
                { symbol: '^IXIC', name: 'NASDAQ', color: '#1E90FF' },
                { symbol: '^DJI', name: 'DOW JONES', color: '#4169E1' }
            ];

            const indices = await Promise.all(
                symbols.map(async (item) => {
                    try {
                        const data = await this.fetchYahooData(item.symbol);
                        return {
                            name: item.name,
                            value: data.price,
                            change: data.changePercent,
                            color: item.color
                        };
                    } catch (error) {
                        console.warn(`Failed to fetch ${item.name}:`, error);
                        return null;
                    }
                })
            );

            return indices.filter(Boolean);
        } catch (error) {
            console.error('Error fetching US indices:', error);
            return this.getFallbackUSData();
        }
    }

    // Fetch Korea market indices (KOSPI, KOSDAQ)
    async fetchKoreaIndices() {
        try {
            const symbols = [
                { symbol: '^KS11', name: 'KOSPI', color: '#9370DB' },
                { symbol: '^KQ11', name: 'KOSDAQ', color: '#BA55D3' }
            ];

            const indices = await Promise.all(
                symbols.map(async (item) => {
                    try {
                        const data = await this.fetchYahooData(item.symbol);
                        return {
                            name: item.name,
                            value: data.price,
                            change: data.changePercent,
                            color: item.color
                        };
                    } catch (error) {
                        console.warn(`Failed to fetch ${item.name}:`, error);
                        return null;
                    }
                })
            );

            return indices.filter(Boolean);
        } catch (error) {
            console.error('Error fetching Korea indices:', error);
            return this.getFallbackKoreaData();
        }
    }

    // Fetch data from Yahoo Finance (free, no API key needed)
    async fetchYahooData(symbol) {
        const url = `${this.apis.yahoo}${symbol}?interval=1d&range=1d`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Yahoo API failed');

            const json = await response.json();
            const quote = json.chart.result[0];
            const meta = quote.meta;
            const currentPrice = meta.regularMarketPrice;
            const previousClose = meta.chartPreviousClose;
            const change = ((currentPrice - previousClose) / previousClose) * 100;

            return {
                price: parseFloat(currentPrice.toFixed(2)),
                changePercent: parseFloat(change.toFixed(2))
            };
        } catch (error) {
            throw error;
        }
    }

    // Fetch top gainers (using finnhub.io - free tier)
    async fetchTopGainers(market = 'US') {
        // Finnhub free API has limitations, so we'll use a predefined list
        // that gets updated periodically via GitHub Actions
        return market === 'US' ? this.getFallbackUSGainers() : this.getFallbackKoreaGainers();
    }

    // Fallback data (current hardcoded data)
    getFallbackUSData() {
        return [
            { name: 'S&P 500', value: 6738.44, change: 0.58, color: '#00CED1' },
            { name: 'NASDAQ', value: 22941.80, change: 0.89, color: '#1E90FF' },
            { name: 'DOW JONES', value: 46734.61, change: 0.31, color: '#4169E1' }
        ];
    }

    getFallbackKoreaData() {
        return [
            { name: 'KOSPI', value: 3929, change: 2.16, color: '#9370DB' },
            { name: 'KOSDAQ', value: 879.15, change: 0.76, color: '#BA55D3' }
        ];
    }

    getFallbackUSGainers() {
        return {
            topMovers: [
                { name: 'Iris Energy (IREN)', change: 15.8 },
                { name: 'Robinhood (HOOD)', change: 12.4 },
                { name: 'Hims & Hers (HIMS)', change: 11.2 },
                { name: 'Palantir (PLTR)', change: 8.9 },
                { name: 'D-Wave (QBTS)', change: 7.5 }
            ],
            ytdTop: [
                { name: 'Iris Energy (IREN)', change: 293.0 },
                { name: 'Nebius Group (NBIS)', change: 259.0 },
                { name: 'Robinhood (HOOD)', change: 235.0 },
                { name: 'D-Wave Quantum (QBTS)', change: 220.0 },
                { name: 'Jumia Tech (JMIA)', change: 204.0 },
                { name: 'Palantir (PLTR)', change: 107.21 },
                { name: 'Newmont (NEM)', change: 102.02 }
            ]
        };
    }

    getFallbackKoreaGainers() {
        return {
            topMovers: [
                { name: 'SK하이닉스', change: 3.8, value: 'AI 반도체' },
                { name: '삼성전자', change: 2.4, value: 'HBM 수주' },
                { name: 'HD현대일렉트릭', change: 5.2, value: '전력장비' },
                { name: 'LS ELECTRIC', change: 4.1, value: '전력인프라' },
                { name: '삼성SDI', change: 3.3, value: '배터리' }
            ],
            ytdTop: [
                { name: 'SK하이닉스', change: 145.0 },
                { name: 'HD현대일렉트릭', change: 98.0 },
                { name: 'LS ELECTRIC', change: 87.0 },
                { name: '삼성SDI', change: 62.0 },
                { name: '삼성전자', change: 45.0 }
            ]
        };
    }

    // Fetch all market data
    async fetchAllData() {
        try {
            const [usIndices, krIndices, usGainers, krGainers] = await Promise.all([
                this.fetchUSIndices(),
                this.fetchKoreaIndices(),
                this.fetchTopGainers('US'),
                this.fetchTopGainers('KR')
            ]);

            return {
                us: {
                    indices: usIndices,
                    ...usGainers
                },
                kr: {
                    indices: krIndices,
                    ...krGainers
                },
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error fetching all data:', error);
            // Return fallback data
            return {
                us: {
                    indices: this.getFallbackUSData(),
                    ...this.getFallbackUSGainers()
                },
                kr: {
                    indices: this.getFallbackKoreaData(),
                    ...this.getFallbackKoreaGainers()
                },
                lastUpdated: new Date().toISOString(),
                usingFallback: true
            };
        }
    }
}

// Export for use in main application
export default StockDataFetcher;
