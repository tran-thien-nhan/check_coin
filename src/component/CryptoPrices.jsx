import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

function CryptoPrices() {
    const [prices, setPrices] = useState({
        pepe: [],
        floki: [],
        shiba: [],
        bonk: [],
        beam: [],
        trog: []
    });

    useEffect(() => {
        const fetchHistoricalData = async () => {
            const coins = [
                'pepe', 
                'floki', 
                'shiba-inu', 
                'bonk',
                'beam',
                'trog'
            ];
            const promises = coins.map(coin =>
                fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch');
                        }
                        return response.json();
                    })
            );

            try {
                const results = await Promise.all(promises);

                const formatData = data => data.prices.map(price => ({
                    x: new Date(price[0]),
                    y: price[1]
                }));

                setPrices({
                    pepe: formatData(results[0]),
                    floki: formatData(results[1]),
                    shiba: formatData(results[2]),
                    bonk: formatData(results[3]),
                    beam: formatData(results[4]),
                    trog: formatData(results[5])
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                // Xử lý trường hợp lỗi fetch
            }
        };

        fetchHistoricalData();
    }, []);

    return (
        <div>
            <h1>Crypto Prices (Last Year)</h1>
            <Chart
                options={{ chart: { id: 'price-chart' }, xaxis: { type: 'datetime' } }}
                series={[
                    { name: 'Pepe', data: prices.pepe },
                    { name: 'Floki', data: prices.floki },
                    { name: 'Shiba', data: prices.shiba },
                    { name: 'Bonk', data: prices.bonk },
                    { name: 'Beam', data: prices.beam },
                    { name: 'Trog', data: prices.trog }
                ]}
                type="line"
                height="350"
            />
        </div>
    );
}

export default CryptoPrices;
