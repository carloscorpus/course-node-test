export class UpdateTodoDto {
    private constructor(
        private readonly id: number,
        private readonly text: string,
        private readonly completeAt?: Date,
    ) {}

    get values() {
        const returnObj: { [Key: string]: any } = {};

        if (this.text) returnObj.text = this.text;
        if (this.completeAt) returnObj.completeAt = this.completeAt;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, text, completeAt } = props;

        let newCompleteAt = completeAt;

        if (!id || isNaN(Number(id))) return ['id must be a valid number'];

        if (completeAt) {
            newCompleteAt = new Date(completeAt);

            if (newCompleteAt.toString() === 'Invalid Date') {
                return ['CompleteAt must be a valid date'];
            }
        }

        return [, new UpdateTodoDto(id, text, newCompleteAt)];
    }
}
