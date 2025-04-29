var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    let percent = (20 * (n + 1));
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("score").innerHTML = percent + '%';
    } else {
        document.getElementById("score").innerHTML = percent + '%';
        document.getElementById("nextBtn").innerHTML = "Selanjutnya";
    }

    // Required on tab 2 and 3
    if (n == 2) {
        if (document.getElementById("certificationBox").children.length < 1) {
            document.getElementById("nextBtn").disabled = true;
            document.getElementById("nextBtn").style.background = "var(--medium-dark-gray)";
        } else {
            document.getElementById("nextBtn").style.background = "var(--primary)";
        }
    } else if (n == 3) {
        if (document.getElementById("skillBox").children.length < 1) {
            document.getElementById("nextBtn").disabled = true;
            document.getElementById("nextBtn").style.background = "var(--medium-dark-gray)";
        } else {
            document.getElementById("nextBtn").style.background = "var(--primary)";
        }
    } else {
        document.getElementById("nextBtn").disabled = false;
        document.getElementById("nextBtn").style.background = "var(--primary)";
    }

    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === -1) {
        document.getElementById("nextBtn").disabled = false;
    }
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("dynamicForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    let x, inputs, textareas, select, i, valid = true;
    x = document.getElementsByClassName("tab");
    inputs = x[currentTab].getElementsByTagName("input");
    textareas = x[currentTab].getElementsByTagName("textarea");
    select = x[currentTab].getElementsByTagName("select");
    const warning = document.createElement("p");
    warning.className = "warning"
    warning.innerHTML = 'Semua <span class="required">*</span> wajib diisi';

    // Validate input fields
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            if (!document.querySelector(".warning")) {
                document.getElementById("userForm").insertAdjacentElement("afterbegin", warning);
            }
            valid = false;
        }
    }

    // Validate textarea fields
    for (i = 0; i < textareas.length; i++) {
        if (textareas[i].value == "") {
            if (!document.querySelector(".warning")) {
                document.getElementById("userForm").insertAdjacentElement("afterbegin", warning);
            }
            valid = false;
        }
    }

    // Validate select fields
    for (i = 0; i < select.length; i++) {
        if (select[i].value == "") {
            if (!document.querySelector(".warning")) {
                document.getElementById("userForm").insertAdjacentElement("afterbegin", warning);
            }
            valid = false;
        }
    }


    // If valid, mark the step as finished and valid:
    if (valid) {
        if (document.querySelector(".warning")) {
            document.querySelector(".warning").remove();
        }
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }

    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

// Word Counter
let textInput = document.getElementById("description");
let wordCount = document.getElementById("countInfo");
let limit = 200;

countInfo.textContent = 0 + '/' + limit;

textInput.addEventListener('input', function () {
    let words = textInput.value.trim().split(/\s+/);
    let wordLength = textInput.value.trim() === '' ? 0 : words.length;

    if (wordLength > limit) {
        textInput.value = words.slice(0, limit).join(' ');
        wordLength = limit;
    }

    wordCount.textContent = wordLength + '/' + limit;
});


// Experience Tab Form
document.getElementById("addExperience").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("experienceWrapper").style.display = "none";
    document.getElementById("tabNavigation").style.display = "none";

    const newFormGroup = document.createElement("div");
    newFormGroup.className = "experienceFormGroup";

    // Label
    let positionTag = document.createElement("label");
    let companyTag = document.createElement("label");
    let startTag = document.createElement("label");
    let endTag = document.createElement("label");
    let experienceTag = document.createElement("label");

    // Posisi
    let position = document.createElement("input");
    position.className = "form-control";
    Object.assign(position, {
        id: "positionInput",
        placeholder: "Masukkan posisi Anda sebelumnya"
    })
    positionTag.innerText = 'Posisi';

    // Perusahaan
    let company = document.createElement("input");
    company.className = "form-control";
    Object.assign(company, {
        id: "companyInput",
        placeholder: "Masukkan perusahaan Anda sebelumnya"
    })
    companyTag.innerText = 'Perusahaan';

    // Tanggal Mulai
    startTag.innerText = 'Tahun Mulai';
    const rowStart = document.createElement("div");
    rowStart.className = "row";

    // --- Bulan Mulai ---
    const colStartMonth = document.createElement("div");
    colStartMonth.className = "col";

    const startMonthSelect = document.createElement('select');
    startMonthSelect.className = "form-select";
    Object.assign(startMonthSelect, {
        id: "startMonthInput",
        'aria-label': "Default select example"
    })
    startMonthSelect.setAttribute('id', 'startMonthInput');
    startMonthSelect.className = 'form-select';
    startMonthSelect.setAttribute('aria-label', 'Default select example');

    const startMonthOptions = [
        { value: '', text: 'Bulan', selected: true },
        { value: 'Januari', text: 'Januari' },
        { value: 'Februari', text: 'Februari' },
        { value: 'Maret', text: 'Maret' },
        { value: 'April', text: 'April' },
        { value: 'Mei', text: 'Mei' },
        { value: 'Juni', text: 'Juni' },
        { value: 'Juli', text: 'Juli' },
        { value: 'Agustus', text: 'Agustus' },
        { value: 'September', text: 'September' },
        { value: 'Oktober', text: 'Oktober' },
        { value: 'November', text: 'November' },
        { value: 'Desember', text: 'Desember' }
    ];

    startMonthOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        startMonthSelect.appendChild(option);
    });

    colStartMonth.appendChild(startMonthSelect);

    // --- Tahun Mulai ---
    const colStartYear = document.createElement("div");
    colStartYear.className = "col";

    const startYearSelect = document.createElement("select");
    Object.assign(startYearSelect, {
        id: "startYearInput",
        'aria-label': 'Default select example'
    })
    startYearSelect.className = 'form-select';

    const startYearOptions = [
        { value: '', text: 'Tahun', selected: true },
        { value: '2025', text: '2025' },
        { value: '2024', text: '2024' },
        { value: '2023', text: '2023' }
    ];

    startYearOptions.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        startYearSelect.appendChild(option);
    });

    colStartYear.appendChild(startYearSelect);

    rowStart.appendChild(colStartMonth);
    rowStart.appendChild(colStartYear);

    // Tanggal Akhir
    endTag.innerText = 'Tanggal Akhir';
    const rowEnd = document.createElement('div');
    rowEnd.className = 'row';

    // --- Bulan Akhir ---
    const colEndMonth = document.createElement('div');
    colEndMonth.className = 'col';

    const endMonthSelect = document.createElement('select');
    Object.assign(endMonthSelect, {
        id: "endMonthInput",
        'aria-label': 'Default select example'
    })
    endMonthSelect.className = 'form-select';

    const endMonthOptions = [
        { value: '', text: 'Bulan', selected: true },
        { value: 'Januari', text: 'Januari' },
        { value: 'Februari', text: 'Februari' },
        { value: 'Maret', text: 'Maret' },
        { value: 'April', text: 'April' },
        { value: 'Mei', text: 'Mei' },
        { value: 'Juni', text: 'Juni' },
        { value: 'Juli', text: 'Juli' },
        { value: 'Agustus', text: 'Agustus' },
        { value: 'September', text: 'September' },
        { value: 'Oktober', text: 'Oktober' },
        { value: 'November', text: 'November' },
        { value: 'Desember', text: 'Desember' }
    ];

    endMonthOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        endMonthSelect.appendChild(option);
    });

    colEndMonth.appendChild(endMonthSelect);

    // --- Tahun Akhir ---
    const colEndYear = document.createElement('div');
    colEndYear.className = 'col';

    const endYearSelect = document.createElement('select');
    Object.assign(endYearSelect, {
        id: "endYearInput",
        'aria-label': 'Default select example'
    })
    endYearSelect.className = 'form-select';

    const endYearOptions = [
        { value: '', text: 'Tahun', selected: true },
        { value: '2025', text: '2025' },
        { value: '2024', text: '2024' },
        { value: '2023', text: '2023' }
    ];

    endYearOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        endYearSelect.appendChild(option);
    });

    colEndYear.appendChild(endYearSelect);

    rowEnd.appendChild(colEndMonth);
    rowEnd.appendChild(colEndYear);

    // Pengalaman
    let experience = document.createElement("textarea");
    experience.className = "form-control";
    let count = document.createElement("p");
    count.setAttribute("id", "countExperience")
    experienceTag.innerText = 'Deskripsi Pekerjaan';
    Object.assign(experience, {
        id: 'experience',
        placeholder: 'Jelaskan informasi singkat serta pencapaian tentang pekerjaanmu sebelumnya'
    })


    // Simpan
    let btnContainer = document.createElement("div")
    btnContainer.setAttribute("id", "btnFormContainer")

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute('id', 'submit');
    submitBtn.innerHTML = "Simpan";

    // Kembali
    let backBtn = document.createElement("button");
    backBtn.setAttribute('id', 'back');
    backBtn.innerHTML = "Kembali";

    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(submitBtn);


    let br = document.createElement("br");
    let hr = document.createElement("hr");

    newFormGroup.appendChild(positionTag);
    newFormGroup.appendChild(position);

    newFormGroup.appendChild(companyTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(company);

    newFormGroup.appendChild(startTag);
    newFormGroup.appendChild(rowStart);

    newFormGroup.appendChild(endTag);
    newFormGroup.appendChild(rowEnd);

    newFormGroup.appendChild(experienceTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(experience);
    newFormGroup.appendChild(count);

    newFormGroup.appendChild(hr.cloneNode())
    newFormGroup.appendChild(btnContainer);
    newFormGroup.appendChild(br.cloneNode());

    document.getElementById("experienceForm").appendChild(newFormGroup);

    // Word Counter
    let textInput = document.getElementById('experience');
    let wordCount = document.getElementById('countExperience');
    let limit = 200;

    count.textContent = 0 + '/' + limit;

    textInput.addEventListener('input', function () {
        let words = textInput.value.trim().split(/\s+/);
        let wordLength = textInput.value.trim() === '' ? 0 : words.length;

        if (wordLength > limit) {
            textInput.value = words.slice(0, limit).join(' ');
            wordLength = limit;
        }

        wordCount.textContent = wordLength + '/' + limit;
    });

    document.getElementById("back").addEventListener("click", (e) => {
        e.preventDefault();

        if (document.querySelector(".warning")) {
            document.querySelector(".warning").remove();
        }

        document.getElementById("experienceWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";
        const form = document.getElementsByClassName('experienceFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const parent = document.getElementById("experienceBox");
        if (parent.children.length < 3) {
            const position = document.getElementById('positionInput').value.trim();
            const company = document.getElementById('companyInput').value.trim();
            const startMonth = document.getElementById('startMonthInput').value;
            const startYear = document.getElementById('startYearInput').value;
            const endMonth = document.getElementById('endMonthInput').value;
            const endYear = document.getElementById('endYearInput').value;
            const experience = document.getElementById('experience').value.trim();

            // If input empty return nothing    
            if (!position || !company || !startMonth || !startYear || !endMonth || !endYear || !experience) {
                if (!document.querySelector(".warning")) {
                    const warning = document.createElement("p");
                    warning.className = "warning"
                    warning.innerText = 'Semua isian wajib diisi';
                    document.getElementById("experienceForm").insertAdjacentElement("afterbegin", warning);
                }
                return;
            };

            const fragment = document.createDocumentFragment();

            // Create the main container div
            const inputDiv = document.createElement('div');
            inputDiv.className = 'inputBox';

            // Create the inputHeading div
            const inputHeading = document.createElement('div');
            inputHeading.className = 'inputHeading';

            // Create the company div
            const companyDiv = document.createElement('div');
            companyDiv.className = 'company';

            const positionP = document.createElement('p');
            positionP.className = 'subheading';
            positionP.textContent = position;

            const companyP = document.createElement('p');
            companyP.textContent = company;

            companyDiv.appendChild(positionP);
            companyDiv.appendChild(companyP);

            // Create the date paragraph
            const dateP = document.createElement('p');
            dateP.className = 'date';
            dateP.textContent = `(${startMonth} ${startYear} - ${endMonth} ${endYear})`;

            // Append company and date to inputHeading
            inputHeading.appendChild(companyDiv);
            inputHeading.appendChild(dateP);

            // Create the experience list
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            li.textContent = experience;
            ul.appendChild(li);

            // Assemble the whole inputDiv
            inputDiv.appendChild(inputHeading);
            inputDiv.appendChild(ul);

            // Append the inputDiv to the fragment
            fragment.appendChild(inputDiv);

            // Append to parent
            document.getElementById('experienceBox').appendChild(fragment);

            document.getElementById("experienceWrapper").style.display = "block";
            document.getElementById("tabNavigation").style.display = "block";

            if (document.querySelector(".warning")) {
                document.querySelector(".warning").remove();
            }

            const form = document.getElementsByClassName('experienceFormGroup')[0];
            form.remove();
        }

        if (parent.children.length >= 3) {
            document.getElementById("addExperience").disabled = true;
        }
    })

})

// Education Tab Form

// -- Education Form
document.getElementById("addEducation").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("educationWrapper").style.display = "none";
    document.getElementById("tabNavigation").style.display = "none";

    const newFormGroup = document.createElement('div');
    newFormGroup.className = 'educationFormGroup';

    // Label
    let majorTag = document.createElement('label');
    let institutionTag = document.createElement('label');
    let startTag = document.createElement('label');
    let endTag = document.createElement('label');

    // Jurusan
    let major = document.createElement("input");
    major.className = "form-control";
    Object.assign(major, {
        id: "majorInput",
        placeholder: "Masukkan jurusan Anda sebelumnya"
    })
    majorTag.innerHTML = 'Jurusan<span class="required">*</span>';
    major.appendChild(majorTag);

    // Institusi
    let institution = document.createElement("input");
    institution.className = "form-control";
    Object.assign(institution, {
        id: "institutionInput",
        placeholder: "Masukkan institusi Anda sebelumnya"
    })
    institutionTag.innerHTML = 'Institusi<span class="required">*</span>';
    institution.appendChild(institutionTag);

    // Tanggal Mulai
    startTag.innerHTML = 'Tanggal Mulai<span class="required">*</span>';
    const rowStart = document.createElement('div');
    rowStart.className = 'row';

    // --- Bulan Mulai ---
    const colStartMonth = document.createElement('div');
    colStartMonth.className = 'col';

    const startMonthSelect = document.createElement('select');
    startMonthSelect.setAttribute('id', 'educationStartMonthInput');
    startMonthSelect.className = 'form-select';

    const startMonthOptions = [
        { value: '', text: 'Bulan', selected: true },
        { value: 'Januari', text: 'Januari' },
        { value: 'Februari', text: 'Februari' },
        { value: 'Maret', text: 'Maret' },
        { value: 'April', text: 'April' },
        { value: 'Mei', text: 'Mei' },
        { value: 'Juni', text: 'Juni' },
        { value: 'Juli', text: 'Juli' },
        { value: 'Agustus', text: 'Agustus' },
        { value: 'September', text: 'September' },
        { value: 'Oktober', text: 'Oktober' },
        { value: 'November', text: 'November' },
        { value: 'Desember', text: 'Desember' }
    ];

    startMonthOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        startMonthSelect.appendChild(option);
    });

    colStartMonth.appendChild(startMonthSelect);

    // --- Tahun Mulai ---
    const colStartYear = document.createElement('div');
    colStartYear.className = 'col';

    const startYearSelect = document.createElement('select');
    startYearSelect.setAttribute('id', 'educationStartYearInput');
    startYearSelect.className = 'form-select';

    const startYearOptions = [
        { value: '', text: 'Tahun', selected: true },
        { value: '2025', text: '2025' },
        { value: '2024', text: '2024' },
        { value: '2023', text: '2023' }
    ];

    startYearOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        startYearSelect.appendChild(option);
    });

    colStartYear.appendChild(startYearSelect);

    rowStart.appendChild(colStartMonth);
    rowStart.appendChild(colStartYear);

    // Tanggal Akhir
    endTag.innerHTML = 'Tanggal Akhir<span class="required">*</span>';
    const rowEnd = document.createElement('div');
    rowEnd.className = 'row';

    // --- Bulan Akhir ---
    const colEndMonth = document.createElement('div');
    colEndMonth.className = 'col';

    const endMonthSelect = document.createElement('select');
    endMonthSelect.setAttribute('id', 'educationEndMonthInput');
    endMonthSelect.className = 'form-select';

    const endMonthOptions = [
        { value: '', text: 'Bulan', selected: true },
        { value: 'Januari', text: 'Januari' },
        { value: 'Februari', text: 'Februari' },
        { value: 'Maret', text: 'Maret' },
        { value: 'April', text: 'April' },
        { value: 'Mei', text: 'Mei' },
        { value: 'Juni', text: 'Juni' },
        { value: 'Juli', text: 'Juli' },
        { value: 'Agustus', text: 'Agustus' },
        { value: 'September', text: 'September' },
        { value: 'Oktober', text: 'Oktober' },
        { value: 'November', text: 'November' },
        { value: 'Desember', text: 'Desember' }
    ];

    endMonthOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        endMonthSelect.appendChild(option);
    });

    colEndMonth.appendChild(endMonthSelect);

    // --- Tahun Akhir ---
    const colEndYear = document.createElement('div');
    colEndYear.className = 'col';

    const endYearSelect = document.createElement('select');
    endYearSelect.setAttribute('id', 'educationEndYearInput');
    endYearSelect.className = 'form-select';

    const endYearOptions = [
        { value: '', text: 'Tahun', selected: true },
        { value: '2025', text: '2025' },
        { value: '2024', text: '2024' },
        { value: '2023', text: '2023' }
    ];

    endYearOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        endYearSelect.appendChild(option);
    });

    colEndYear.appendChild(endYearSelect);

    rowEnd.appendChild(colEndMonth);
    rowEnd.appendChild(colEndYear);


    // Simpan
    let btnContainer = document.createElement("div")
    btnContainer.setAttribute("id", "btnFormContainer")

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute('id', 'submit');
    submitBtn.innerHTML = "Simpan";

    // Kembali
    let backBtn = document.createElement("button");
    backBtn.setAttribute('id', 'back');
    backBtn.innerHTML = "Kembali";

    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(submitBtn);

    let br = document.createElement("br");
    let hr = document.createElement("hr");

    newFormGroup.appendChild(majorTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(major);

    newFormGroup.appendChild(institutionTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(institution);

    newFormGroup.appendChild(startTag);
    newFormGroup.appendChild(rowStart);

    newFormGroup.appendChild(endTag);
    newFormGroup.appendChild(rowEnd);

    newFormGroup.appendChild(hr.cloneNode())
    newFormGroup.appendChild(btnContainer);
    newFormGroup.appendChild(br.cloneNode());

    document.getElementById("educationForm").appendChild(newFormGroup);

    document.getElementById("back").addEventListener("click", (e) => {
        e.preventDefault();

        document.getElementById("educationWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        if (document.querySelector(".warning")) {
            document.querySelector(".warning").remove();
        }

        const form = document.getElementsByClassName('educationFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const major = document.getElementById('majorInput').value.trim();
        const institution = document.getElementById('institutionInput').value.trim();
        const startMonth = document.getElementById('educationStartMonthInput').value;
        const startYear = document.getElementById('educationStartYearInput').value;
        const endMonth = document.getElementById('educationEndMonthInput').value;
        const endYear = document.getElementById('educationEndYearInput').value;

        // If input empty return nothing    
        if (!major || !institution || !startMonth || !startYear || !endMonth || !endYear) {
            if (!document.querySelector(".warning")) {
                const warning = document.createElement("p");
                warning.className = "warning"
                warning.innerHTML = 'Semua <span class="required">*</span> wajib diisi';
                document.getElementById("educationForm").insertAdjacentElement("afterbegin", warning);
            }
            return;
        };

        // Create fragment
        const fragment = document.createDocumentFragment();

        // Create the main container div
        const inputDiv = document.createElement('div');
        inputDiv.className = "inputBox";

        // Create the inputHeading div
        const inputHeading = document.createElement('div');
        inputHeading.className = "inputHeading";

        // Create the company (institution info) div
        const companyDiv = document.createElement('div');
        companyDiv.className = "company";

        const subheading = document.createElement('p');
        subheading.className = "subheading";
        subheading.textContent = `${institution}`;

        const majorP = document.createElement('p');
        majorP.textContent = `${major}`;

        companyDiv.appendChild(subheading);
        companyDiv.appendChild(majorP);

        // Create the date paragraph
        const dateP = document.createElement('p');
        dateP.className = "date";
        dateP.textContent = `(${startMonth} ${startYear} - ${endMonth} ${endYear})`

        // Assemble the inputHeading
        inputHeading.appendChild(companyDiv);
        inputHeading.appendChild(dateP);

        // Append inputHeading to inputDiv
        inputDiv.appendChild(inputHeading);

        // Append inputDiv to the fragment
        fragment.appendChild(inputDiv);

        // Append to parent
        document.getElementById("educationBox").appendChild(fragment);

        document.getElementById("educationWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";
        document.getElementById("addEducation").style.display = "none";
        document.getElementById("info").style.display = "none";

        if (document.querySelector(".warning")) {
            document.querySelector(".warning").remove();
        }

        const form = document.getElementsByClassName('educationFormGroup')[0];
        form.remove();
    })

})

// -- Certificate Form
document.getElementById("addCertificate").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("educationWrapper").style.display = "none";
    document.getElementById("tabNavigation").style.display = "none";

    const newFormGroup = document.createElement('div');
    newFormGroup.className = 'certificateFormGroup';

    // Label
    let certificateTag = document.createElement('label');
    let certificateInstitutionTag = document.createElement('label');
    let certificateNumberTag = document.createElement('label');
    let certificateYearTag = document.createElement('label');

    // Sertifikat
    let certificate = document.createElement("input");
    certificate.className = "form-control";
    Object.assign(certificate, {
        id: "certificateInput",
        placeholder: "Masukkan nama sertifikasi yang Anda punya"
    })
    certificateTag.innerHTML = 'Nama Sertifikasi<span class="required">*</span>';
    certificate.appendChild(certificateTag);

    // Institusi
    let certificateInstitution = document.createElement("input");
    certificateInstitution.className = "form-control";
    Object.assign(certificateInstitution, {
        id: "certificateInstitutionInput",
        placeholder: "Masukkan lembaga penyelenggara sertifikasi yang Anda punya"
    })
    certificateInstitutionTag.innerHTML = 'Lembaga Penyelenggara<span class="required">*</span>';
    certificateInstitution.appendChild(certificateInstitutionTag);

    // Nomor Sertifikat
    let certificateNumber = document.createElement("input");
    certificateNumber.className = "form-control";
    Object.assign(certificateNumber, {
        id: "certificateNumberInput",
        placeholder: "Masukkan no. lisensi dari sertifikasi yang Anda punya",
    })
    certificateNumberTag.innerHTML = 'Nomor Sertifikasi<span class="required">*</span>';
    certificateNumber.appendChild(certificateNumberTag);

    // Tahun Terbit
    const certificateYear = document.createElement('select');
    Object.assign(certificateYear, {
        id: "certificateYearInput",
        'aria-label': 'Default select example'
    })
    certificateYear.className = 'form-select';
    certificateYearTag.innerHTML = 'Tahun Diselenggarakan<span class="required">*</span>';
    const certificateYearOptions = [
        { value: '', text: 'Tahun', selected: true },
        { value: '2025', text: '2025' },
        { value: '2024', text: '2024' },
        { value: '2023', text: '2023' }
    ];

    certificateYearOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.selected) option.selected = true;
        certificateYear.appendChild(option);
    });

    certificateYear.appendChild(certificateYearTag);

    // Simpan
    let btnContainer = document.createElement("div")
    btnContainer.setAttribute("id", "btnFormContainer")

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute('id', 'submit');
    submitBtn.innerHTML = "Simpan";

    // Kembali
    let backBtn = document.createElement("button");
    backBtn.setAttribute('id', 'back');
    backBtn.innerHTML = "Kembali";

    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(submitBtn);

    let br = document.createElement("br");
    let hr = document.createElement("hr");

    newFormGroup.appendChild(certificateTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(certificate);

    newFormGroup.appendChild(certificateInstitutionTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(certificateInstitution);

    newFormGroup.appendChild(certificateNumberTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(certificateNumber);

    newFormGroup.appendChild(certificateYearTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(certificateYear);

    newFormGroup.appendChild(hr.cloneNode())
    newFormGroup.appendChild(btnContainer);
    newFormGroup.appendChild(br.cloneNode());

    document.getElementById("educationForm").appendChild(newFormGroup);

    document.getElementById("back").addEventListener("click", (e) => {
        e.preventDefault();

        document.getElementById("educationWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        if (document.querySelector(".warning")) {
            document.querySelector(".warning").remove();
        }

        const form = document.getElementsByClassName('certificateFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const parent = document.getElementById("certificationBox");
        if (parent.children.length < 3) {
            const certificate = document.getElementById('certificateInput').value.trim();
            const certificateInstitution = document.getElementById('certificateInstitutionInput').value.trim();
            const certificateNumber = document.getElementById('certificateNumberInput').value.trim();
            const certificateYear = document.getElementById('certificateYearInput').value;

            // If input empty return nothing    
            if (!certificate || !certificateInstitution || !certificateNumber || !certificateYear) {
                if (!document.querySelector(".warning")) {
                    const warning = document.createElement("p");
                    warning.className = "warning"
                    warning.innerHTML = 'Semua <span class="required">*</span> wajib diisi';
                    document.getElementById("educationForm").insertAdjacentElement("afterbegin", warning);
                }
                return;
            };

            // Create fragment
            const fragment = document.createDocumentFragment();

            // Create the main container div
            const inputDiv = document.createElement('div');
            inputDiv.className = 'inputBox';

            // Create the inputHeading div
            const inputHeading = document.createElement('div');
            inputHeading.className = 'inputHeading';

            // Create the company (certificate info) div
            const companyDiv = document.createElement('div');
            companyDiv.className = 'company';

            const certTitle = document.createElement('p');
            certTitle.className = 'subheading';
            certTitle.textContent = certificate;

            const certInstitution = document.createElement('p');
            certInstitution.textContent = certificateInstitution;

            companyDiv.appendChild(certTitle);
            companyDiv.appendChild(certInstitution);

            // Create the date paragraph
            const dateP = document.createElement('p');
            dateP.className = 'date';
            dateP.textContent = `(${certificateYear})`;

            // Assemble the inputHeading
            inputHeading.appendChild(companyDiv);
            inputHeading.appendChild(dateP);

            // Append inputHeading to inputDiv
            inputDiv.appendChild(inputHeading);

            // Append inputDiv to the fragment
            fragment.appendChild(inputDiv);

            // Append to parent
            document.getElementById('certificationBox').appendChild(fragment);

            document.getElementById("educationWrapper").style.display = "block";
            document.getElementById("tabNavigation").style.display = "block";

            if (document.querySelector(".warning")) {
                document.querySelector(".warning").remove();
            }

            document.getElementById("nextBtn").disabled = false;
            document.getElementById("nextBtn").style.background = "var(--primary)";
            const form = document.getElementsByClassName('certificateFormGroup')[0];
            form.remove();
        }

        if (parent.children.length >= 3) {
            document.getElementById("addCertificate").disabled = true;
        }
    })

})

// Skills Tab Form
document.getElementById("addSkills").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("skillsWrapper").style.display = "none";
    document.getElementById("tabNavigation").style.display = "none";

    const newFormGroup = document.createElement('div');
    newFormGroup.className = 'skillsFormGroup';

    // Label
    let skillTag = document.createElement('label');
    let skillDescriptionTag = document.createElement('label');

    // Keahlian
    let skill = document.createElement("input");
    skill.className = "form-control";
    Object.assign(skill, {
        id: "skillNameInput",
        placeholder: "Cari keahlian Anda"
    })
    skillTag.innerHTML = 'Keahlian<span class="required">*</span>';
    skill.appendChild(skillTag);

    // Deskripsi Keahlian
    let skillDescription = document.createElement("textarea");
    skillDescription.className = "form-control";
    let count = document.createElement("p");
    Object.assign(skillDescription, {
        id: "skill",
        placeholder: "Jelaskan informasi singkat tentang keahlian Anda"
    })
    count.setAttribute("id", "countSkill");
    skillDescriptionTag.innerHTML = "Deskripsi Keahlian";
    skillDescription.appendChild(skillDescriptionTag);

    // Simpan
    let btnContainer = document.createElement("div")
    btnContainer.setAttribute("id", "btnFormContainer")

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute('id', 'submit');
    submitBtn.innerHTML = "Simpan";

    // Kembali
    let backBtn = document.createElement("button");
    backBtn.setAttribute('id', 'back');
    backBtn.innerHTML = "Kembali";

    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(submitBtn);

    let br = document.createElement("br");
    let hr = document.createElement("hr");

    newFormGroup.appendChild(skillTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(skill);

    newFormGroup.appendChild(skillDescriptionTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(skillDescription);
    newFormGroup.appendChild(count);

    newFormGroup.appendChild(hr.cloneNode())
    newFormGroup.appendChild(btnContainer);
    newFormGroup.appendChild(br.cloneNode());

    document.getElementById("skillsForm").appendChild(newFormGroup);

    // Word Counter
    let textInput = document.getElementById('skill');
    let wordCount = document.getElementById('countSkill');
    let limit = 200;

    count.textContent = 0 + '/' + limit;

    textInput.addEventListener('input', function () {
        let words = textInput.value.trim().split(/\s+/);
        let wordLength = textInput.value.trim() === '' ? 0 : words.length;

        if (wordLength > limit) {
            textInput.value = words.slice(0, limit).join(' ');
            wordLength = limit;
        }

        wordCount.textContent = wordLength + '/' + limit;
    });

    document.getElementById("back").addEventListener("click", (e) => {
        e.preventDefault();

        document.getElementById("skillsWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        if (document.querySelector(".warning")) {
            document.querySelector(".warning").remove();
        }

        const form = document.getElementsByClassName('skillsFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const parent = document.getElementById("skillBox");
        if (parent.children.length < 3) {
            const skill = document.getElementById('skillNameInput').value.trim();
            const skillDescription = document.getElementById('skill').value.trim();

            // If input empty return nothing    
            if (!skill || !skillDescription) {
                if (!document.querySelector(".warning")) {
                    const warning = document.createElement("p");
                    warning.className = "warning"
                    warning.innerHTML = 'Semua <span class="required">*</span> wajib diisi';
                    document.getElementById("skillsForm").insertAdjacentElement("afterbegin", warning);
                }
                return;
            };

            const fragment = document.createDocumentFragment();

            // Create the main container div
            const inputDiv = document.createElement('div');
            inputDiv.className = 'inputBox';

            // Create the heading container
            const inputHeading = document.createElement('div');
            inputHeading.className = 'inputHeading';

            // Create and append the skill paragraph
            const skillP = document.createElement('p');
            skillP.className = 'subheading';
            skillP.textContent = skill;
            inputHeading.appendChild(skillP);

            // Create the unordered list with the skill description
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            li.textContent = skillDescription;
            ul.appendChild(li);

            // Assemble everything
            inputDiv.appendChild(inputHeading);
            inputDiv.appendChild(ul);
            fragment.appendChild(inputDiv);

            // Append fragment to parent
            document.getElementById("skillBox").appendChild(fragment);

            document.getElementById("skillsWrapper").style.display = "block";
            document.getElementById("tabNavigation").style.display = "block";

            if (document.querySelector(".warning")) {
                document.querySelector(".warning").remove();
            }

            document.getElementById("nextBtn").disabled = false;
            document.getElementById("nextBtn").style.background = "var(--primary)";
            const form = document.getElementsByClassName("skillsFormGroup")[0];
            form.remove();
        }

        if (parent.children.length >= 3) {
            document.getElementById("addSkills").disabled = true;
        }

    })

})

// Others Tab Form
document.getElementById("addOthers").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("otherWrapper").style.display = "none";
    document.getElementById("otherInfo").style.display = "none";
    document.getElementById("tabNavigation").style.display = "none";

    const newFormGroup = document.createElement('div');
    newFormGroup.className = 'otherFormGroup';

    // Label
    let managerNumberTag = document.createElement('label');
    let companyTag = document.createElement('label');
    let managerNameTag = document.createElement('label');
    let recommendationTag = document.createElement('label');

    // Nomor Manager
    let managerNumber = document.createElement("input");
    managerNumber.className = "form-control";
    Object.assign(managerNumber, {
        id: "managerNumberInput",
        placeholder: "Masukkan no. telepon manager sebelumnya",
        type: "tel"
    })
    managerNumberTag.innerHTML = "No. Telepon Manager Sebelumnya";
    managerNumber.appendChild(managerNumberTag);

    // Perusahaan
    let company = document.createElement("input");
    company.className = "form-control";
    Object.assign(company, {
        id: "companyInput",
        placeholder: "Masukkan nama perusahaan sebelumnya"
    })
    companyTag.innerHTML = "Nama Perusahaan Sebelumnya ";
    company.appendChild(companyTag);

    // Manager
    let managerName = document.createElement("input");
    managerName.className = "form-control";
    Object.assign(managerName, {
        id: "managerInput",
        placeholder: "Masukkan nama manager sebelumnya"
    })
    managerNameTag.innerHTML = "Nama Manager Sebelumnya";
    managerName.appendChild(managerNameTag);

    // Surat Rekomendasi
    let recommendation = document.createElement("input");
    Object.assign(recommendation, {
        id: "recommendationFileInput",
        type: "file"
    })
    recommendationTag.innerHTML = "Surat Rekomendasi";
    let recommendationLabel = document.createElement('label');
    Object.assign(recommendationLabel, {
        for: "recommendationFileInput",
        id: "fileInput"
    })
    recommendationLabel.setAttribute('for', 'recommendationFileInput');
    recommendationLabel.innerHTML = '<img src="./assets/fileInput.png" alt="fileInput" style="margin-right: 0.5rem"> Unggah Surat Rekomendasi';
    recommendation.appendChild(recommendationTag);

    // Simpan
    let btnContainer = document.createElement("div")
    btnContainer.setAttribute("id", "btnFormContainer")

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute('id', 'submit');
    submitBtn.innerHTML = "Simpan";

    // Kembali
    let backBtn = document.createElement("button");
    backBtn.setAttribute('id', 'back');
    backBtn.innerHTML = "Kembali";

    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(submitBtn);

    let br = document.createElement("br");
    let hr = document.createElement("hr");

    newFormGroup.appendChild(managerNumberTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(managerNumber);

    newFormGroup.appendChild(companyTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(company);

    newFormGroup.appendChild(managerNameTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(managerName);

    newFormGroup.appendChild(recommendationTag);
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(recommendationLabel);
    newFormGroup.appendChild(recommendation);

    newFormGroup.appendChild(hr.cloneNode())
    newFormGroup.appendChild(btnContainer);
    newFormGroup.appendChild(br.cloneNode());


    document.getElementById("otherForm").appendChild(newFormGroup);

    document.getElementById("back").addEventListener("click", (e) => {
        e.preventDefault();

        if (document.querySelector(".warning")) {
            document.querySelector(".warning").remove();
        }

        document.getElementById("otherWrapper").style.display = "block";
        document.getElementById("otherInfo").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        const form = document.getElementsByClassName('otherFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const parent = document.getElementById("otherBox");
        if (parent.children.length < 3) {
            const managerNumber = document.getElementById('managerNumberInput').value.trim();
            const company = document.getElementById('companyInput').value.trim();
            const manager = document.getElementById('managerInput').value.trim();


            if (!managerNumber || !company || !manager) {
                if (!document.querySelector(".warning")) {
                    const warning = document.createElement("p");
                    warning.className = "warning"
                    warning.innerText = 'Semua isian wajib diisi';
                    document.getElementById("otherForm").insertAdjacentElement("afterbegin", warning);
                }
                return;
            };
            // Create fragment
            const fragment = document.createDocumentFragment();

            // Create the main container div
            const inputDiv = document.createElement('div');
            inputDiv.className = 'inputBox';

            // Create the heading container
            const inputHeading = document.createElement('div');
            inputHeading.className = 'inputHeading';

            // Add the company name as a subheading
            const companyP = document.createElement('p');
            companyP.className = 'subheading';
            companyP.textContent = company;
            inputHeading.appendChild(companyP);

            // Create the manager line
            const managerP = document.createElement('p');
            managerP.style.margin = '0';
            managerP.textContent = `${managerNumber} .a.n ${manager}`;

            // Assemble
            inputDiv.appendChild(inputHeading);
            inputDiv.appendChild(managerP);
            fragment.appendChild(inputDiv);

            // Append to parent
            document.getElementById('otherBox').appendChild(fragment);

            document.getElementById("otherWrapper").style.display = "block";
            document.getElementById("tabNavigation").style.display = "block";
            document.getElementById("otherInfo").style.display = "block";

            const form = document.getElementsByClassName('otherFormGroup')[0];
            form.remove();
        }
        if (parent.children.length >= 3) {
            document.getElementById("addOthers").disabled = true;
        }

    })

})