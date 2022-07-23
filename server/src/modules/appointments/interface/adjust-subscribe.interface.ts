export enum EStatus {
    INCREASE = 'increase',
    DECREASE = 'decrease',
}

export interface IAdjustSubscribe {
    status: EStatus;
    target: {
        appointment_id: string;
        value: number;
    };
}
