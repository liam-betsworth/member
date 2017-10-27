# member.js

A Javascript library that offers simple storage and retrieval of data within a browser. It builds on localstorage, allowing you to store native Javascript objects.

> “It ‘members things, so you don’t have to.”
> – <cite>A purple berry</cite>

## Building a prototype that needs to carry data between webpages?

When building a prototype front-end web service, there’s often no back-end to plug into. As a result, developers must fake some interactions to achieve a ‘real’ feel.

One of the most obvious things that is missing in these prototypes is the ability to store and retrieve data between webpages.

There are alternatives to back-end storage, such as localStorage and cookies within the browser. However, by default, these utilities do not cater for the storage of complex data types.

*Member.js* offers a simple way to store any Javscript data type. It also makes retrieval painless.

## How to use it

### Include the library

```
<script src="member.js"></script>
```

### Storing and retrieving data

Treat `member` as a Javascript object. It acts and behaves like one, though remembers data between pages.

#### A single variable
```
member.flag = true;

console.log(member.flag);
//true
```

#### JSON
```
member.users = {
                 'liam': {
                   'gender': 'M',
                   'age': 26,
                   'admin': true
                 }
               };
               
console.log(member.users);
//{'liam': {'gender': 'M','age': 26,'admin': true}};
```

#### Brackets and dot notation
```
member['liam']['age'] = 27;

console.log(member.liam.age);
//27
```

#### Inherits behaviour of Javascript objects
```
member.users.push(
                   'wayne': {
                     'gender': 'M',
                     'age': 34,
                     'admin' false
                   }
                 );
                 
console.log(member.users);
//{'liam': {'gender': 'M','age': 26,'admin': true}, 'wayne': {'gender': 'M','age': 34,'admin' false}};
```

## Examples

### Store a value from a text input field (using jQuery)

```
<html>
  <input type="text" id="saleType" />
</html>

<script>
  member.typeOfSale = $('#saleType').val();
</script>
```

### Retrieve a stored value and output to a span (using jQuery)

```
<html>
  <span id="saleType"></span>
</html>

<script>
  $('#saleType').html(member.typeOfSale);
</script>
```