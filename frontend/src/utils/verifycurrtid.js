export const verifytid = async (currtid,terimals)=>{
    var flag = 0;
    terimals.map((terminal)=>{
        if(currtid === terminal.tid){
            flag = 1;
            return;
        }
    })
    if(flag === 1){
        return {
            status:"error",
            message:`Tid-${currtid} already exists`
        }
    }
    return {
        status:"ok"
    }
}