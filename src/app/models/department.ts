export class Department {
    id:string;
    name:string;
    description:string;
    constructor(name:string, id?:string,description?:string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    
    public get departmentId() : string {
        return this.id;
    }
    public get departmentName() : string {
        return this.id;
    }
    public get departmentDescription() : string {
        return this.id;
    }
    

    
}