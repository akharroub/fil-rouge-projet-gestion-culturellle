export class RoleDto {
    id: number;
    label: string;
    constructor(id?: number, value?: string){
        this.id = id;
        this.label = value;
    }
}
