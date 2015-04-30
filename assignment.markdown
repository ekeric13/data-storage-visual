We will be storing, transforming, and displaying some data.

### 1. Let's setup a database

First, create a database (use any database system you like or want to try) that contains data in a linear structure like this:

```
[
    {name: 'Apparel', size: 439501},
    {name: 'Apparel > T-Shirts', size: 82393},
    {name: 'Apparel > T-Shirts > James Franco', size: 12901},
    {name: 'Apparel > T-Shirts > Neil deGrasse Tyson', size: 10233},
    {name: 'Apparel > T-Shirts > Stephen Amell', size: 39949},
    {name: 'Apparel > T-Shirts > Will Ferrell', size: 1345},
    {name: 'Art > Portraits', size: 90983},
    {name: 'Art > Portraits > Song Birds', size: 1294},
    {name: 'Art > Portraits > Art Deco Print', size: 7671},
    ...
]
```

In this case, `>` is a separator of categories/subcategories.
Don't worry about any API endpoints, feel free to fill it with data manually.

### 2. Making sense of it

Next, it would be nice to read all of this data and transform it into a tree structure like this:

```
[
    {
        name: 'Apparel',
        size: 439501,
        children: [
            {
                name: 'T-Shirts',
                size: 82393,
                children: [
                    {
                        name: 'James Franco',
                        size: 12901
                    },
                    {
                        name: 'Neil deGrasse Tyson',
                        size: 10233
                    },
                    ...
                ]
            }
        ]
    },
    {
        name: 'Art',
        size: null,
        children: [
            {
                name: 'Portraits',
                size: 90983,
                children: [...]
            }
        ]
    }
]
```

* Can you write an algrorithm that will output such a tree?
* What complexity (in O notation) is the algorithm?
<!-- O(n*m + n*2) n = number of entries, m=how far nested -->

### 3. Now it's time to show the data in a user-friendly way

* Can you design and build an interface to show this data?
* Can you implement a search feature for this UI?

<hr>

Feel free to use any tools, frameworks or libraries. Whatever you are most comfortable with or something new that you wanted to try for a long time. Just let me know what you chose, why, and what was your previous experience with it.
