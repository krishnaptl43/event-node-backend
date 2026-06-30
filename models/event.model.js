import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    thumbnail: {
        type: String,
        default: null
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    images: [{
        type: String,
        default: null
    }],
    reporting_time: {
        type: String,
        default: "00:00"
    },
    time: {
        type: String,
        default: "00:00"
    },
    vip_ticket_price: {
        type: Number,
        default: 0
    },
    general_ticket_price: {
        type: Number,
        default: 0
    },
    total_vip_tickets: {
        type: Number,
        default: 0
    },
    total_general_tickets: {
        type: Number,
        default: 0
    },
    vip_tickets_sold: {
        type: Number,
        default: 0
    },
    general_tickets_sold: {
        type: Number,
        default: 0
    },
    isUpcoming: {
        type: Boolean,
        default: true
    },
    isOngoing: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

});

const eventModel = model('event', eventSchema);

export default eventModel;