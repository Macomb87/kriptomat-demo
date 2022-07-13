import axios from "axios";
export default {

    async getCryptoCurrencies() {
        const result = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h%2C30d%2C200d%2C1y');
        return result.data || null;
    },
    async getDailyVolume(id,from,to){

        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=eur&from=${from}&to=${to}`);
        return result.data || null;
    },
    async getCryptoRange(id,from, to) {
        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=eur&from=${from}&to=${to}`);
        return result.data || null;
    }
}
