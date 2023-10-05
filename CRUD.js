export class CRUD{
	#tableName = null;
    #data = null;
  
	constructor(tableName){
 		this.#setTableName(tableName);
      	this.#setData();
  	}

	#setTableName(tableName){
		this.#tableNameValidate(tableName);
        this.#tableName = tableName;
	}
    
    #setData(){
        let dataRepository = this.#get(this.tableName);
        this.#data = dataRepository === null ? [] : dataRepository;
	}
    
    #tableNameValidate(tableName){
		if(tableName === undefined) throw new Error("Table name required");
	}
    
    #save(){
        let dataToSave=JSON.stringify(this.#data);
        sessionStorage.setItem(this.#tableName, dataToSave);
    }

    #get(key){
        let data = sessionStorage.getItem(key);
        return JSON.parse(data);
    }

    #existElementWhithId(id){
        return this.#data[id] === undefined ? false : true;
    }

    #checkThatElementExistsWthithId(id){
        if(!this.#existElementWhithId(id))
         throw new Error("This Element not exists");
    }

    create(data){
        this.#data.push(data);
        this.#save();
        return this.#data.length;
    }

	read(id){
        this.#checkThatElementExistsWthithId(id);
        return this.#data[id];
    }

    readAll(){
        return this.#data;
    }

	update(id, data){
        this.#checkThatElementExistsWthithId(id);
        this.#data[id] = data;
        this.#save();
        return true;
    }

	delete(id){
        this.#checkThatElementExistsWthithId(id);
        this.#data.splice(id, 1);
        this.#save();
        return true;
    }

}