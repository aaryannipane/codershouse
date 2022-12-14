import mongoose from "mongoose";
const {Schema} = mongoose;

const RefreshSchema = new mongoose.Schema({
    token: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps: true
}
)

const RefreshModel = mongoose.model('Refresh', RefreshSchema, 'tokens');

export default RefreshModel;