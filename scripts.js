// DOM elementleri al
const searchInput = document.getElementById('searchInput');
const newLeadButton = document.getElementById('newLeadButton');
const leadTable = document.getElementById('leadTable');
const leadList = document.getElementById('leadList');

// Arama kutusuna yazıldığında
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const leads = leadList.querySelectorAll('tr');

    leads.forEach(lead => {
        const ad = lead.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const soyad = lead.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const telefon = lead.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const email = lead.querySelector('td:nth-child(4)').textContent.toLowerCase();

        if (ad.includes(searchText) || soyad.includes(searchText) || telefon.includes(searchText) || email.includes(searchText)) {
            lead.style.display = 'table-row';
        } else {
            lead.style.display = 'none';
        }
    });
});

// Yeni lead ekle butonuna tıklanınca formun gösterilmesi
newLeadButton.addEventListener('click', () => {
    leadFormContainer.style.display = 'block';
});

// Lead ekleme formunun gönderilmesi
const leadForm = document.getElementById('leadForm');
leadForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Formun sayfayı yenilememesi için default davranışı engelle
    const ad = document.getElementById('ad').value;
    const soyad = document.getElementById('soyad').value;
    const telefon = document.getElementById('telefon').value;
    const email = document.getElementById('email').value;

    // Yeni lead objesi oluştur
    const lead = {
        ad: ad,
        soyad: soyad,
        telefon: telefon,
        email: email
    };

    // Lead'i listeye ekleme
    addLeadToList(lead);

    // Formu temizleme
    leadForm.reset();

    // Formu gizleme
    leadFormContainer.style.display = 'none';
});

// Lead'i listeye ekleme
function addLeadToList(lead) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><a href="#" class="leadDetailLink">${lead.ad}</a></td>
        <td>${lead.soyad}</td>
        <td>${lead.telefon}</td>
        <td>${lead.email}</td>
        <td>
            <button class="viewLeadButton">Detay</button>
            <button class="updateLeadButton">Güncelle</button>
            <button class="deleteLeadButton">Sil</button>
        </td>
    `;
    leadList.appendChild(row);
}

// Lead detay linklerine tıklanınca detay sayfasının açılması
leadList.addEventListener('click', (e) => {
    if (e.target.classList.contains('leadDetailLink')) {
        e.preventDefault();
        const leadName = e.target.textContent;
        const leadDetailURL = `/lead/${leadName}`; // Lead detay sayfasının URL'si
        window.location.href = leadDetailURL; // Detay sayfasını aç
    }
});

// View düğmesine tıklanınca lead detaylarını gösterme veya gizleme
leadList.addEventListener('click', (e) => {
    if (e.target.classList.contains('viewLeadButton')) {
        // View düğmesine tıklanırsa yapılacak işlemler
        const leadRow = e.target.closest('tr');
        const ad = leadRow.querySelector('td:nth-child(1)').textContent;
        const soyad = leadRow.querySelector('td:nth-child(2)').textContent;
        const telefon = leadRow.querySelector('td:nth-child(3)').textContent;
        const email = leadRow.querySelector('td:nth-child(4)').textContent;

        // Lead detaylarını oluştur
        const leadDetailHTML = `
            <tr class="leadDetailRow">
                <td colspan="5">
                    <strong>Ad:</strong> ${ad}<br>
                    <strong>Soyad:</strong> ${soyad}<br>
                    <strong>Telefon:</strong> ${telefon}<br>
                    <strong>Email:</strong> ${email}<br>
                </td>
            </tr>
        `;
    
        // Eğer zaten lead detayları eklenmişse, gizle
        const existingLeadDetailRow = leadList.querySelector('.leadDetailRow');
        if (existingLeadDetailRow) {
            existingLeadDetailRow.remove();
            // Detaylar gizlendiği için bu aşamada fonksiyonu sonlandır
            return;
        }

        // Lead detaylarını leadRow'un altına ekle
        leadRow.insertAdjacentHTML('afterend', leadDetailHTML);
    }
});


    } else if (e.target.classList.contains('deleteLeadButton')) {
        // Delete düğmesine tıklanırsa yapılacak işlemler
        if (confirm('Bu leadi silmek istediğinize emin misiniz?')) {
            const leadRow = e.target.closest('tr');
            leadRow.remove();

            // Lead detaylarını da sil
            const leadDetailRow = leadList.querySelector('.leadDetailRow');
            if (leadDetailRow) {
                leadDetailRow.remove();
            }
        
            alert('Lead başarıyla silindi.');
        }
    
    }

//lead görünümünü güncelle ve değiştirme butonu ekle içerikler gözükecek şeklinde olsun.
//lead görünüm altında başka pencere açılır ve buton aktif hale gelir.


