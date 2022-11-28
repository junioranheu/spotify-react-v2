export default function UUID(){
    const UUID = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return UUID;
}