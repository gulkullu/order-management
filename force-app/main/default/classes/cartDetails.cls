public with sharing class cartDetails {
    @AuraEnabled(cacheable=true)
    public static Cart__c getCartDetails(Id cartId) {
        List<Cart__c> carts = [
            SELECT Id, Name, Total_Amount__c, Total_Quantity__c,
                   CustomerH__r.Name, CustomerH__r.Street_Address__c,
                   CustomerH__r.City__c, CustomerH__r.Zip_code__c
            FROM Cart__c
            WHERE Id = :cartId
            LIMIT 1
        ];
        return carts.isEmpty() ? null : carts[0];
    }
    
    
}