import prismaClient from "../../prisma";


interface orderRequest {
    order_id: string
}

class RemoveOrderService {
    async execute({order_id}:orderRequest) {
        const order = await prismaClient.order.delete({
            where: {
                id:order_id
            }
        })
        return order;
    }
}


export {RemoveOrderService}