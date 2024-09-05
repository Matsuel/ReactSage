import { UserModel } from "../scheme/User";
import bcrypt from 'bcrypt';

const checkPin = async (data: any, socket: any) => {
    console.log(data);
    console.log('checkPin');
    

    const { phone, pin } = data
    try {
        const user = await UserModel.findOne({ phone })
        if (user) {
            const match = bcrypt.compareSync(pin, user.pin);
            if (match) {
                socket.emit('checkPin', { success: true, id: user._id, username: user.username });
            } else {
                socket.emit('checkPin', { success: false, message: 'Pin not match' });
            }
        } else {
            socket.emit('checkPin', { success: false, message: 'User not found' });
        }
    } catch (error) {
        socket.emit('checkPin', { success: false, message: 'Login failed' });
    }
}

export default checkPin;