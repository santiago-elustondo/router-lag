# Prices

### Data Struct
- A **Price** object is the *set of active PriceUnit objects for a particular product*.
- **PriceUnit** objects define a single price rule for a single product, and *are always derived from a PriceSet object*. The PriceUnit object is tied to its parent PriceSet, and its lifecycle is dependent on it.
- **PriceSet** provide PriceUnit objects, define lifecycle rules for them, and usually provide a **PriceDoc** object, which is the original document that legitimizes the PriceSet object (usually a manufacturer price sheet document).

**PriceUnit**
--------------------------------------------------

**PriceUnit** objects look like this:
```typescript
{
  amount: number; //numeric value, literal dollar value
  cosmetic?: 'regular' | 'promotional'; //UI directive, 'regular' is assumed
  
  priceSet: string; //key of priceSet that this PriceUnit is derived from
  createdDateTime: number; //same as priceSet
  
  activationDateTime?: number;
  active: boolean;
  
  priceType: string; // (see PriceType section)
  fieldName?: string; //key within price, assumed same as priceType 
  label: string; //label used by the manufacturer to describe this priceUnit
   
  product: { //product that this PriceUnit is for
    "brand": string;
    "modelCode": string;
    "productKey": string;
  }
}
```

**PriceUnit** objects are stored in the **PriceUnit**s collection. Every **PriceUnit** object that exists (active or inactive, present or historic), can be found there. This is not to say that they won't be found elsewhere, but that if they are, it is a duplicate. <br /> <br />
The **PriceUnit** collection is indexed in the following order:<br />
1) brand <br />
2) modelCode / productId (undecided as of july 22) <br />
3) fieldName <br />
4) createdDateTime <br />


**Price**
--------------------------------------------------


**Price** objects contain copies of upcoming, active, and recently expired **priceUnit**s for a particular product for quick access. These could be stored within the product object itself, or in a separate Prices collection (undecided as of July 22)<br /><br />
The "product" field of its children is added once at the top of scope (might be removed from children to avoid redundancy, undecided as of July 19). The children priceUnits are indexed by their "fieldName" property. <br /> <br />
**Price** objects look like this:
```typescript
{
  priceUnits: {
    [fieldName: string]: PriceUnit;
  },
  product: { //same as children
    "brand": string;
    "modelCode": string;
    "productKey": string;
  }
}
```

**PriceSet**
--------------------------------------------------

**PriceSet** objects consist primarily of a collection of independent **PriceUnit**s. Usually these collections come each from a single manufacturer price sheet. Every **PriceUnit** object originates from and is bound to a single **PriceSet** object. <br /> <br/>
**PriceSet**s contain other properties, apart form the collection of priceUnits, that provide relevant metadata, information about the original source document, and lifecycle data. <br /> <br/>
The lifecycle of a **PriceUnit** is always dependent on that of its parent **PriceSet**. If a **PriceSet** is made "inactive", then all of the **PriceUnit**s that originate from it are made inactive as well, regardless of their own activation/expiration dates. <br /> <br/>

**PriceSet** objects look like this:
```typescript
{
  createdDateTime: number;
  createdBy: string; // <UserID>
  
  active: boolean;
  activationDateTime?: number;
  expirationDateTime?: number;
  lifecycleHistory?: {
    [dateTime: number] : {
      action: 'activate' | 'deactivate';
      causedBy: 'admin' | 'expiration';
      adminId?: string;
      dateTime: number; 
    }
  };
  
  manufacturer: string;
  
  sourceDoc: Object; //original spreadsheet data
  priceUnits: [PriceUnit];
  
}
```

The *sourceDoc* property of PriceSet contains the original spreadsheet document in JSON format. <br /> <br />

A SourceDoc object (with a unique google id) may only be referenced within 1 PriceSet.<br /> <br />
Sometimes it is useful to be able to find a PriceSet that contains a certain sourceDoc. For this reason we also keep a separate collection, called **SourceDocs**, that serves at a reverse index. This collection only contains references to **PriceSet**s indexed by their sourceDoc Id (which is the spreadsheet's unique identifier within google as well).


The **SourceDocs** collection looks like this:
```typescript
{
  [sourceDoc.id: string]: {
    sourceDoc: Object; //original spreadsheet data
  }
}
```
