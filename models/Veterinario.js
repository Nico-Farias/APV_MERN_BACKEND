import mongoose, { trusted } from "mongoose";
import bcrypt from 'bcrypt';
import generarId from './../helpers/generarID.js';

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: true
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

veterinarioSchema.pre('save', async function (netx) {

    if (!this.isModified('password')) {
        netx()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

veterinarioSchema.methods.comprobarPassword = async function (passwordFormaulario) {
    return await bcrypt.compare(passwordFormaulario, this.password)
}



const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;