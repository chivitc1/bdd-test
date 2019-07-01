
const kafka = require('kafka-node');

const publishMessageToChannel = (req, res) => {
    try {
        const Producer = kafka.Producer;
        const client = new kafka.KafkaClient(process.env.KAFKA_SERVER);
        const producer = new Producer(client);
        // console.log(req.body.message);
        // console.log(req.body.channel);
        let payloads = [
            {
                topic: req.body.channel,
                messages: req.body.message
            }
        ];

        producer.on('ready', async function () {
            producer.send(payloads, (err, data) => {
                if (err) return res.status(500).json({ "message": err });
                return res.status(200).json({ "message": "OK" });
            });
        });

        producer.on('error', function (err) {
            console.log(err);
            return res.status(400).json({ "message": err });
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ "message": e });
    }
}

export default { publishMessageToChannel };
