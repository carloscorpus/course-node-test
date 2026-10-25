export class CreatoTodoDto {
    private constructor(public readonly text: string) {}

    static create(props: { [keys: string]: any }): [string?, CreatoTodoDto?] {
        const { text } = props;

        if (!text) return ['Text property is requeres'];

        return [, new CreatoTodoDto(text)];
    }
}
