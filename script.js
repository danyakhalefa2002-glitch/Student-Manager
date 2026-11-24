// إنشاء Class للطلاب حتى نستخدمه كقالب لإنشاء الطلاب
class Student {
  // استقبال بيانات كل طالب وتخزينها داخل الـ Object
  constructor(name, age, major) {
    this.name = name;
    this.age = age;
    this.major = major;
  }
}

// إنشاء خمسة طلاب باستخدام الـ Class الذي أنشأناه
const student1 = new Student("Esma", 21, "Computer Engineering");
const student2 = new Student("Meryem", 23, "Software Engineering");
const student3 = new Student("Ahmed", 24, "Artificial Intelligence");
const student4 = new Student("Omar", 22, "Cybersecurity");
const student5 = new Student("Nur", 20, "Information Systems");

// إنشاء Array فارغة حتى نجمع فيها جميع الطلاب
const students = [];

// الوصول إلى المكان الذي سنعرض فيه الطلاب داخل HTML
const studentsList = document.getElementById("studentsList");

// إضافة الطلاب الخمسة إلى المصفوفة باستخدام push()
students.push(student1, student2, student3, student4, student5);

// الوصول إلى العنصر المسؤول عن عرض عدد الطلاب
const studentCount = document.getElementById("studentCount");

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const studentName = document.getElementById("studentName");
  const studentAge = document.getElementById("studentAge");
  const studentMajor = document.getElementById("studentMajor");

  const name = studentName.value;
  const age = studentAge.value;
  const major = studentMajor.value;

  const newStudent = new Student(name, age, major);
  students.push(newStudent);
  displayStudents();

  // تفريغ حقول النموذج بعد إضافة الطالب حتى نتمكن من إدخال بيانات طالب جديد
  studentName.value = "";
  studentAge.value = "";
  studentMajor.value = "";
});

// عرض الطلاب من المصفوفة المرسلة، واستخدام جميع الطلاب افتراضيًا إذا لم نحدد مصفوفة أخرى
function displayStudents(studentArray = students) {
  // تفريغ القائمة قبل عرض الطلاب من جديد حتى لا تتكرر البيانات
  studentsList.innerHTML = "";
  // المرور على جميع الطلاب وعرض بيانات كل طالب داخل الصفحة

  studentArray.forEach(function (student) {
    const originalIndex = students.indexOf(student);

    studentsList.innerHTML += `
    <div class="student-card">
      <div class="student-info">
        <div class="student-avatar">
          ${student.name.charAt(0).toUpperCase()}
        </div>

        <div class="student-details">
          <h3>${student.name}</h3>
          <p>${student.major}</p>
        </div>
      </div>

      <span class="student-age">${student.age} years</span>

      <button
        class="delete-button"
        onclick="deleteStudent(${originalIndex})"
      >
        Delete
      </button>
    </div>
  `;
  });

  if (studentArray.length === 0) {
    studentsList.innerHTML = `
    <p class="empty-message">No students found.</p>
  `;
  }

  // عرض عدد الطلاب الموجودين داخل المصفوفة باستخدام length
  studentCount.textContent = students.length;
}

displayStudents();

// إنشاء Function لحذف الطالب الذي نختاره من القائمة باستخدام رقم ترتيبه
function deleteStudent(index) {
  // حذف الطالب من المصفوفة باستخدام index وحذف عنصر واحد فقط
  students.splice(index, 1);

  // تحديث قائمة الطلاب والعداد بعد الحذف
  displayStudents();
}

const searchInput = document.getElementById("searchInput");

// تنفيذ البحث تلقائيًا عند الكتابة داخل حقل البحث
searchInput.addEventListener("input", function () {
  // الحصول على النص الذي أدخله المستخدم في حقل البحث وتحويله إلى أحرف صغيرة لتسهيل المطابقة
  const searchValue = searchInput.value.toLowerCase();

  // إنشاء Array جديدة تحتوي فقط على الطلاب الذين تتطابق أسماؤهم مع النص الذي يبحث عنه المستخدم
  const filteredStudents = students.filter(function (student) {
    // التحقق مما إذا كان اسم الطالب يحتوي على النص الذي أدخله المستخدم
    return student.name.toLowerCase().includes(searchValue);
  });

  // عرض الطلاب الذين تطابقت أسماؤهم مع النص الذي أدخله المستخدم
  displayStudents(filteredStudents);
});
