const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    email: {type: String, required: true},
    products: [
        {
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }],
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: 'Pending', required: true},
}, {timestamps: true});

// mongoose.models = {}
// export default mongoose.model("Order", OrderSchema);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)