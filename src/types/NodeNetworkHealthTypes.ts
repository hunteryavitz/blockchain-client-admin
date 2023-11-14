export type NodeCoordinates = {
    x: number
    y: number
}

export type DataGroup = {
    label: string
    data: NodeCoordinates[]
}

export type NodeData = {
    data: {
        backgroundColor: string[],
        datasets: {
            label: string,
            data: {
                x: number,
                y: number,
            }[],
        }[],
    }
}

export type NodeNetworkHealthResponse = {
    nodeHealthResponse: [{
        nodeId: number,
        nodeStatus: string,
        nodeTraffic: number
    }]
}
