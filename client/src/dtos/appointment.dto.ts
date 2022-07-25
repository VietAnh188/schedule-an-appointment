export class AppointmentDto {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly start_time: string;
    readonly end_time: string;
    readonly limit: number;
    readonly price: string;
    readonly tags: [];
    readonly subscribed: number;

    constructor (id: string, title: string, content: string, start_time: string, end_time: string, limit: number, price: string, tags: [], subscribed: number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.start_time = start_time;
        this.end_time = end_time;
        this.limit = limit;
        this.price = price;
        this.tags = tags;
        this.subscribed = subscribed;
    }
}