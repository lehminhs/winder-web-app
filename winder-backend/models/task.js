import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: { type: String, required : true },
    assignee: { type: String, required: true },
    assigneeName: { type: String, required: true },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    createdAtShort: { type: String, required: true },
    ticketNumber: { type: Number, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    creator: { type: String, required: true },
    creatorName: {type: String, required: true},
    description: { type: String, required: true },
    id: { type: String }
})

export default mongoose.model('Task', taskSchema);