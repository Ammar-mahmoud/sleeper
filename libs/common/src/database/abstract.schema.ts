import { Schema, Prop } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema()
export abstract class AbstractDocument {
    @Prop({type: SchemaTypes.ObjectId})
    _id: string;

    @Prop({type: Date, default: Date.now})
    createdAt: Date;
    
    @Prop({type: Date, default: Date.now})
    updatedAt: Date;

    @Prop({type: Boolean, default: false})
    isDeleted: boolean;
}