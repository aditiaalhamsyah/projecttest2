
function rupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

function nilai(id) {
    const input = document.getElementById(id);
    const angka = Number(input.value);

    if (
        input.value.trim() === "" ||
        !Number.isFinite(angka) ||
        angka < 0
    ) {
        return 0;
    }

    return angka;
}

// Fungsi menghitung gaji
function hitungGaji() {
    const pokok = nilai("gajiPokok");
    const tunjangan = nilai("tunjangan");
    const bonus = nilai("bonus");
    const potongan = nilai("potongan");

    const bersih = Math.max(
        0,
        pokok + tunjangan + bonus - potongan
    );

    // Tampilkan hasil hanya setelah tombol ditekan
    document.getElementById("hasilGaji").style.display = "block";

    document.getElementById("gajiBersih").textContent =
        rupiah(bersih);

    document.getElementById("rPokok").textContent =
        rupiah(pokok);

    document.getElementById("rTunjangan").textContent =
        rupiah(tunjangan);

    document.getElementById("rBonus").textContent =
        rupiah(bonus);

    document.getElementById("rPotongan").textContent =
        rupiah(potongan);

    document.getElementById("rBersih").textContent =
        rupiah(bersih);
}

// Fungsi download slip gaji
function downloadSlip() {
    // Cek apakah gaji sudah dihitung
    if (
        document.getElementById("hasilGaji").style.display === "none"
    ) {
        alert("Silakan tekan tombol Hitung Gaji terlebih dahulu!");
        return;
    }

    const nama =
        document.getElementById("nama").value.trim() || "Karyawan";

    const periode =
        document.getElementById("periode").value || "-";

    const bank =
        document.getElementById("bank").value.trim() || "-";

    const rekening =
        document.getElementById("rekening").value.trim() || "-";

    const pemilik =
        document.getElementById("pemilik").value.trim() || "-";

    const pokok = nilai("gajiPokok");
    const tunjangan = nilai("tunjangan");
    const bonus = nilai("bonus");
    const potongan = nilai("potongan");

    const bersih = Math.max(
        0,
        pokok + tunjangan + bonus - potongan
    );

    const isi = `
SLIP GAJI KARYAWAN
================================

Periode          : ${periode}
Nama Karyawan    : ${nama}

INFORMASI REKENING
Bank             : ${bank}
Nomor Rekening   : ${rekening}
Pemilik Rekening : ${pemilik}

RINCIAN GAJI
Gaji Pokok       : ${rupiah(pokok)}
Tunjangan        : ${rupiah(tunjangan)}
Bonus            : ${rupiah(bonus)}
Potongan         : ${rupiah(potongan)}

GAJI BERSIH      : ${rupiah(bersih)}
================================
`;

    const file = new Blob([isi], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "slip-gaji.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}
