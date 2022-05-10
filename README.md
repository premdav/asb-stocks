# Amount Small Business - Stocks app
This is a simple application that displays stock symbols and company names.
When a desired stock is clicked, it will show a details page to display OHLCV data
for the past 10 days. (this data is mocked and will not change from stock to stock).

### To Start
- run `yarn install` or `npm install` to install needed dependencies
- run `yarn start` to start the front end alone
If running the front end using `yarn start` run the following command in a new terminal to ensure all data is displayed correctly:
`json-server --watch db.json --port 3100`
- to run both the mock server and front end together:
- - ensure pm2 is installed globally. It can be installed with `npm install -g pm2`
- - run `yarn start:all`
- - to shut down both, simply run `yarn shutdown` and the pm2 processes will be killed and deleted