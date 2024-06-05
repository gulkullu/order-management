import { LightningElement, wire, api, track } from 'lwc';
import getCartDetails from '@salesforce/apex/cartDetails.getCartDetails'; // Import your Apex method

export default class OrderConfirmation extends LightningElement {
    @api recordId; // The record ID will be provided if this component is placed on a record page
    @track cartDetails; // Used to store the cart details fetched from Apex

    // Use wire service to invoke the Apex method
    @wire(getCartDetails, { cartId: '$recordId' })
    wiredCartDetails({ error, data }) {
        if (data) {
            this.cartDetails = data; // Assign the data to the cartDetails property
        } else if (error) {
            console.error('Error fetching cart details:', error); // Log any errors
            this.cartDetails = undefined; // Clear the previous data in case of error
        }
    }

    // Getters to expose parts of the cart details to the template
    get cartNumber() {
        return this.cartDetails ? this.cartDetails.Name : 'N/A';
    }

    get totalQuantity() {
        return this.cartDetails ? this.cartDetails.Total_Quantity__c : '0';
    }

    get totalAmount() {
        return this.cartDetails ? this.cartDetails.Total_Amount__c : '0';
    }

    get customerName() {
        return this.cartDetails && this.cartDetails.CustomerH__r ? this.cartDetails.CustomerH__r.Name : 'N/A';
    }

    get deliveryAddress() {
        if (this.cartDetails && this.cartDetails.CustomerH__r) {
            const customer = this.cartDetails.CustomerH__r;
            return `${customer.Street_Address__c}, ${customer.City__c}, ${customer.Zip_code__c}`;
        }
        return 'N/A';
    }
}
