import { LightningElement, wire } from 'lwc';
import searchChef from '@salesforce/apex/ChefCtrl.searchChef';
import searchFood from '@salesforce/apex/FoodCtrl.searchFood';

import FOOD_OBJ from '@salesforce/schema/Food__c';
import CHEF_OBJ from '@salesforce/schema/Chef__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class CustomSearchBar extends LightningElement {

    isName = true;
    food;
    chef;
    error;

    @wire(getObjectInfo, {objectApiName: FOOD_OBJ})
    foodInfo;
    @wire(getObjectInfo, {objectApiName:CHEF_OBJ})
    chefInfo;

    changeHandler(event){
        const selectedName = event.target.value;
        searchFood({word:selectedName})
            .then(result => {
                if(result.length > 0 && selectedName.length > 1){
                    this.food = result;
                    this.error = undefined;
                    console.log('food --> ', this.food);
                }else if(result.length > 0 && selectedName.length > 1){
                    this.chef = result;
                    this.error = undefined;
                    console.log('food --> ', this.food);
                }else{
                    this.error = "No results were found matching your search.";
                    this.food = undefined;
                }
            })
            .catch(error => {
                this.error = error.body.message;
            })

        searchChef({word:selectedName})
            .then(result => {
                if(result.length > 0 && selectedName.length > 1){
                    this.food = result;
                    this.error = undefined;
                    console.log('food --> ', this.food);
                }else{
                    this.error = "No results were found matching your search.";
                    this.food = undefined;
                }
            })
            .catch(error => {
                this.error = error.body.message;
            })
    }


}