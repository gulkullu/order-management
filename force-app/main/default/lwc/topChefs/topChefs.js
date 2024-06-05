import { LightningElement, wire, track } from 'lwc';
import getTopChefs from '@salesforce/apex/TopChefsController.getTopChefs';

export default class TopChefs extends LightningElement {
    @track chefs = [];

    @wire(getTopChefs)
    wiredChefs({ error, data }) {
        if (data) {
            this.chefs = data;
        } else if (error) {
            console.error('Error fetching top chefs:', error);
        }
    }
}