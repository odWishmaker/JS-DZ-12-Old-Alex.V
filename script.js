// ДЗ 26. Студенты на прототипах
// Переделать 19 ДЗ через прототипы
// методы:
// - добавление оценки студенту за занятие(№ занятия === индекс оценки в массиве)
// -получение средней оценки студента по имени
// Должны быть методами студента а не группы.
// Только теперь функция конструктор группы студентов должна принимать не массив,
// а список студентов через запятую.
// Экземпляру созданому с помощью функции конструктора группы студентов должны быть 
// доступны не только методы описанные в ДЗ 19 но и все методы массива
// Пример использования:
// var den = new Student('Denis', 30);
// var olya =  new Student('Olya', 25);
// var group = new Group(den, olya);
// group.sortByName() /// должна работать
// group.getAvarageGroupMarks() // должна работать как и остальные методы описанные в ДЗ 19
// group.map(...) /// должна работать
// group.filter(...) /// должна работать
// group.reduce(...) /// должна работать  как и остальные методы массива


function Student(name, age) {
    this.name = name;
    this.age = age;
    this.marks = [];
};

Group.prototype = Array.prototype;
// function Group(...name) {
//     this.name = name
// };

function Group() {
    // this.push.apply(this, [arguments]);
    // this.push.call(this, arguments);
    this.push.apply(this, arguments);
};

Group.prototype.addStudent = function(student) {
   return this.push(student);
};

Group.prototype.removeStudent = function(name) {
    let index = this.findIndex(function(item) {
        return item.name === name;
    });

    if (index !== -1) {
        this.splice(index, 1);
    }

    return index;
};

Student.prototype.addMarksStudent = function(lessons, marks) {
    this.marks[lessons - 1] = marks
};

Student.prototype.averageMarksStudentName = function() {
    let result = this.marks.reduce(function(sum, marks) {
        return sum + marks;
    });

    return result / this.marks.length
};

Group.prototype.averageMarksGrupLessons = function(lessons) {
    return this.reduce(function(sum, student) {
        return student.marks[lessons - 1] ? sum + student.marks[lessons - 1] : sum;
    }, 0) / this.length;
};

Group.prototype.sortStudentName = function() {
    return sortName = group.sort(function(a, b) {
        if(a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
    })
};

Group.prototype.sortStudentMarks = function () {
    let sortMarks = group.map(function (student) {
        return {
            name: student.name,
            age: student.age,
            marks: student.marks,
            averag: student.marks.reduce(function (sum, num) {
                return num ? sum + num : sum
            }) / student.marks.length
        };
    });

    sortMarks.sort(function (a, b) {
        return b.averag - a.averag
    });

    removeAveragesortMarks = sortMarks.map(function (ele) {
        return {
            name: ele.name,
            age: ele.age,
            marks: ele.marks
        }
    })

    return removeAveragesortMarks
};


//Создаем студентов
let валера = new Student('Валера', 19);
let никита = new Student('Никита', 22);
let аня = new Student('Аня', 20);
let альберт = new Student('Альберт', 21);
let юля = new Student('Юля', 23);

//Создаем группу 
let group = new Group(валера, никита, аня, альберт, юля);
console.log('Группа студентов: ', group)

//Добавляем студента в группу
let роберт = new Student('Роберт', 21);
console.log('Добавление студента в группу: ', group.addStudent(роберт));

//Удаляем студента с группы 
console.log('Удаление студента из группы: ', group.removeStudent('Альберт'));

//Добавляем оценки студентам
юля.addMarksStudent(1, 10);
юля.addMarksStudent(2, 8);
юля.addMarksStudent(3, 11);

аня.addMarksStudent(1, 8);
аня.addMarksStudent(2, 11);
аня.addMarksStudent(3, 6);

никита.addMarksStudent(1, 6);
никита.addMarksStudent(2, 8);
никита.addMarksStudent(3, 3);

валера.addMarksStudent(1, 7);
валера.addMarksStudent(2, 9);
валера.addMarksStudent(3, 12);

роберт.addMarksStudent(1, 6);
роберт.addMarksStudent(2, 3);
роберт.addMarksStudent(3, 3);

//Средняя оценка студента по имени
console.log('Средняя оценка студента по имени за все лекции: ', роберт.averageMarksStudentName());

//Средняя оценка группы за занятие
console.log('Средняя оценка группы за занятие: ', group.averageMarksGrupLessons(3))

//Сортировка группы по имени
console.log('Сортировка группы по имени: ', group.sortStudentName())

//Сортировка группы по средней оценке
console.log('Сортировка группы по средней оценке: ', group.sortStudentMarks())