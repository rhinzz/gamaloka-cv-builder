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

    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, inputs, textareas, select, i, valid = true;
    x = document.getElementsByClassName("tab");
    inputs = x[currentTab].getElementsByTagName("input");
    textareas = x[currentTab].getElementsByTagName("textarea");
    select = x[currentTab].getElementsByTagName("select")

    /**
        // Validate input fields
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                inputs[i].className += " invalid";
                valid = false;
            }
        }
    
        // Validate textarea fields
        for (i = 0; i < textareas.length; i++) {
            if (textareas[i].value == "") {
                textareas[i].className += " invalid";
                valid = false;
            }
        }
    
        // Validate select fields
        for (i = 0; i < select.length; i++) {
            if (select[i].value == "") {
                select[i].className += " invalid";
                valid = false;
            }
        }
    */

    // If valid, mark the step as finished and valid:
    if (valid) {
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
    Object.assign(position, {
        id: "positionInput",
        placeholder: "Masukkan posisi Anda sebelumnya"
    })
    positionTag.innerHTML = 'Posisi<span class="required">*</span>';

    // Perusahaan
    let company = document.createElement("input");
    Object.assign(company, {
        id: "companyInput",
        placeholder: "Masukkan perusahaan Anda sebelumnya"
    })
    companyTag.innerHTML = 'Perusahaan<span class="required">*</span>';

    // Tanggal Mulai
    startTag.innerHTML = 'Tahun Mulai<span class="required">*</span>';
    const rowStart = document.createElement("div");
    rowStart.className = "row";

    // --- Bulan Mulai ---
    const colStartMonth = document.createElement("div");
    colStartMonth.className = "col";

    const startMonthSelect = document.createElement('select');
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
    endTag.innerHTML = 'Tanggal Akhir<span class="required">*</span>';
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
    let count = document.createElement("p");
    count.setAttribute("id", "countExperience")
    experienceTag.innerHTML = 'Deskripsi Pekerjaan<span class="required">*</span>';
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
    newFormGroup.appendChild(br.cloneNode());
    newFormGroup.appendChild(position);
    newFormGroup.appendChild(br.cloneNode());

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
    newFormGroup.appendChild(br.cloneNode());
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

        document.getElementById("experienceWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        const form = document.getElementsByClassName('experienceFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const position = document.getElementById('positionInput').value.trim();
        const company = document.getElementById('companyInput').value.trim();
        const startMonth = document.getElementById('startMonthInput').value;
        const startYear = document.getElementById('startYearInput').value;
        const endMonth = document.getElementById('endMonthInput').value;
        const endYear = document.getElementById('endYearInput').value;
        const experience = document.getElementById('experience').value.trim();

        // If input empty return nothing    
        if (!position && !company && !startMonth && !startYear && !endMonth && !endYear && !experience) return;

        const inputDiv = document.createElement('div');
        inputDiv.setAttribute('class', 'inputBox')
        inputDiv.innerHTML = `
        <div class= 'inputHeading'>
        <div class= 'company'>
        <p class='subheading' id='experiencePosition'>${position}</p>
        <p id='experienceCompany'>${company}</p>
        </div>
        <p class ='date' id ='experienceDate'>(${startMonth} ${startYear} - ${endMonth} ${endYear})</p>
        </div>
        <ul>
        <li id = 'experienceDesc'>${experience}</li>
        </ul>
      `;

        document.getElementById('experienceBox').appendChild(inputDiv);

        document.getElementById("experienceWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        const form = document.getElementsByClassName('experienceFormGroup')[0];
        form.remove();
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
    Object.assign(major, {
        id: "majorInput",
        placeholder: "Masukkan jurusan Anda sebelumnya"
    })
    majorTag.innerHTML = 'Jurusan<span class="required">*</span>';
    major.appendChild(majorTag);

    // Institusi
    let institution = document.createElement("input");
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
        if (!major && !institution && !startMonth && !startYear && !endMonth && !endYear && !experience) return;

        const inputDiv = document.createElement('div');
        inputDiv.setAttribute('class', 'inputBox')
        inputDiv.innerHTML = `
        <div class= 'inputHeading'>
        <div class= 'company'>
        <p class='subheading' id='institutionInput'>${institution}</p>
        <p id='majorInput'>${major}</p>
        </div>
        <p class ='date' id ='educationDate'>(${startMonth} ${startYear} - ${endMonth} ${endYear})</p>
        </div>
      `;

        document.getElementById('educationBox').appendChild(inputDiv);

        document.getElementById("educationWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";
        document.getElementById("addEducation").style.display = "none";
        document.getElementById("info").style.display = "none";


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
    Object.assign(certificate, {
        id: "certificateInput",
        placeholder: "Masukkan nama sertifikasi yang Anda punya"
    })
    certificateTag.innerHTML = 'Nama Sertifikasi<span class="required">*</span>';
    certificate.appendChild(certificateTag);

    // Institusi
    let certificateInstitution = document.createElement("input");
    Object.assign(certificateInstitution, {
        id: "certificateInstitutionInput",
        placeholder: "Masukkan lembaga penyelenggara sertifikasi yang Anda punya"
    })
    certificateInstitutionTag.innerHTML = 'Lembaga Penyelenggara<span class="required">*</span>';
    certificateInstitution.appendChild(certificateInstitutionTag);

    // Nomor Sertifikat
    let certificateNumber = document.createElement("input");
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

        const form = document.getElementsByClassName('certificateFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const certificate = document.getElementById('certificateInput').value.trim();
        const certificateInstitution = document.getElementById('certificateInstitutionInput').value.trim();
        const certificateNumber = document.getElementById('certificateNumberInput').value.trim();
        const certificateYear = document.getElementById('certificateYearInput').value;

        // If input empty return nothing    
        if (!certificate && !certificateInstitution && !certificateNumber && !certificateYear) return;

        const inputDiv = document.createElement('div');
        inputDiv.setAttribute('class', 'inputBox')
        inputDiv.innerHTML = `
        <div class= 'inputHeading'>
        <div class= 'company'>
        <p class='subheading' id='certificateInput'>${certificate}</p>
        <p id= certificateInstitutionInput'>${certificateInstitution}</p>
        </div>
        <p class ='date' id ='educationDate'>(${certificateYear})</p>
        </div>
      `;

        document.getElementById('certificationBox').appendChild(inputDiv);

        document.getElementById("educationWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";


        const form = document.getElementsByClassName('certificateFormGroup')[0];
        form.remove();
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
    Object.assign(skill, {
        id: "skillNameInput",
        placeholder: "Cari keahlian Anda"
    })
    skillTag.innerHTML = 'Keahlian<span class="required">*</span>';
    skill.appendChild(skillTag);

    // Deskripsi Keahlian
    let skillDescription = document.createElement("textarea");
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
    newFormGroup.appendChild(br.cloneNode());
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

        const form = document.getElementsByClassName('skillsFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const skill = document.getElementById('skillNameInput').value.trim();
        const skillDescription = document.getElementById('skill').value.trim();

        // If input empty return nothing    
        if (!skill && !skillDescription) return;

        const inputDiv = document.createElement('div');
        inputDiv.setAttribute('class', 'inputBox');
        inputDiv.innerHTML = `
        <div class="inputHeading">
            <p class='subheading' id='skillNameInput'>${skill}</p>
        </div>
        <ul>
        <li id="skillDescription">${skillDescription}</li>
        </ul>
      `;

        document.getElementById("skillBox").appendChild(inputDiv);

        document.getElementById("skillsWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        const form = document.getElementsByClassName("skillsFormGroup")[0];
        form.remove();
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
    Object.assign(managerNumber, {
        id: "managerNumberInput",
        placeholder: "Masukkan no. telepon manager sebelumnya",
        type: "tel"
    })
    managerNumberTag.innerHTML = "No. Telepon Manager Sebelumnya";
    managerNumber.appendChild(managerNumberTag);

    // Perusahaan
    let company = document.createElement("input");
    Object.assign(company, {
        id: "companyInput",
        placeholder: "Masukkan nama perusahaan sebelumnya"
    })
    companyTag.innerHTML = "Nama Perusahaan Sebelumnya ";
    company.appendChild(companyTag);

    // Manager
    let managerName = document.createElement("input");
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

        document.getElementById("otherWrapper").style.display = "block";
        document.getElementById("otherInfo").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";

        const form = document.getElementsByClassName('otherFormGroup')[0];
        form.remove();
    });

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();

        const managerNumber = document.getElementById('managerNumberInput').value.trim();
        const company = document.getElementById('companyInput').value.trim();
        const manager = document.getElementById('managerInput').value.trim();


        // If input empty return nothing    
        if (!managerNumber && !company && !manager) return;

        const inputDiv = document.createElement('div');
        inputDiv.setAttribute('class', 'inputBox')
        inputDiv.innerHTML = `
        <div class='inputHeading'>
            <p class='subheading' id='companyInput'>${company}</p>
        </div>
        <p id='managerContactInput' style="margin:0">${managerNumber} .a.n ${manager}</p>
      `;

        document.getElementById('otherBox').appendChild(inputDiv);

        document.getElementById("otherWrapper").style.display = "block";
        document.getElementById("tabNavigation").style.display = "block";
        document.getElementById("otherInfo").style.display = "block";
        
        const form = document.getElementsByClassName('otherFormGroup')[0];
        form.remove();
    })

})