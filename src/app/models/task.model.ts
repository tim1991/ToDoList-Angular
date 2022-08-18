export class Task {
    constructor(
        public id: number,
        public name: string,
        public date: Date,
        public done: boolean,
    ) {}
}
