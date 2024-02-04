//|------------------------|
//|     Container Data     |
//|------------------------|

/*
containerData is an array that contains all of the data for each container.
    name:               The name of the container.
    class:              The class for CSS reasons.
    price:              The price in USD.
    num_modules:        Total number of module docks.
    num_angled:         Number of angled module docks.
    num_level:          [Optional] Number of level module docks.
    num_level_2:        [Optional] Number of level module docks in the third row.
    horizontal_ruler:   The dimensions to be displayed on the horizontal ruler.
    vertical_ruler:     The dimensions to be displayed on the vertical ruler.
*/

// Mark 0
const Mark0 = {
    name: "Mark 0 Container",
    class: "one-one",
    price: 45,
    num_modules: 1,
    num_angled: 1,
    horizontal_ruler: "12.5cm",
    vertical_ruler: "12.5cm"
}

// Mark I Horizontal
const MarkIhoriz = {
    name: "Mark I Container (Horizontal)",
    class: "one-two",
    price: 50,
    num_modules: 2,
    num_angled: 2,
    horizontal_ruler: "24cm",
    vertical_ruler: "12.5cm"
}

// Mark I Vertical
const MarkIvert = {
    name: "Mark I Container (Vertical)",
    class: "two-one",
    price: 50,
    num_modules: 2,
    num_angled: 1,
    num_level: 1,
    horizontal_ruler: "12.5cm",
    vertical_ruler: "24cm"
}

// Mark II
const MarkII = {
    name: "Mark II Container",
    class: "three-one",
    price: 60,
    num_modules: 3,
    num_angled: 1,
    num_level: 1,
    num_level_2: 1,
    horizontal_ruler: "12.5cm",
    vertical_ruler: "35.5cm"
}

// Mark III
const MarkIII = {
    name: "Mark III Container",
    class: "two-two",
    price: 70,
    num_modules: 4,
    num_angled: 2,
    num_level: 2,
    horizontal_ruler: "24cm",
    vertical_ruler: "24cm"
}

// Mark IV
const MarkIV = {
    name: "Mark IV Container",
    class: "two-three",
    price: 90,
    num_modules: 6,
    num_angled: 3,
    num_level: 3,
    horizontal_ruler: "35.5cm",
    vertical_ruler: "24cm"
}

// Mark V
const MarkV = {
    name: "Mark V Container",
    class: "two-four",
    price: 120,
    num_modules: 8,
    num_angled: 4,
    num_level: 4,
    horizontal_ruler: "47cm",
    vertical_ruler: "24cm"
}