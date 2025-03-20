from flask import Blueprint, render_template, request, redirect, url_for
from extensions import db
from sqlalchemy import CheckConstraint

ayam_bp = Blueprint('ayam_bp', __name__, template_folder='../templates/ayam')


# Model Ayam
class Ayam(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False)
    usia = db.Column(db.Integer, nullable=False)  # Menggunakan "usia"
    berat = db.Column(db.Float, nullable=False)
    kondisi = db.Column(db.String(10), nullable=False)  # "Sehat" atau "Sakit"

    __table_args__ = (
        CheckConstraint("kondisi IN ('Sehat','Sakit')", name='check_kondisi'),
    )


# @ayam_bp.route('/')
# def index():
#     ayam_list = Ayam.query.all()
#     return render_template('index.html', ayam_list=ayam_list)

@ayam_bp.route('/')
def index():
    page = request.args.get('page', 1, type=int)  # Ambil parameter ?page=, default 1
    per_page = 5  # Banyaknya data per halaman

    pagination = Ayam.query.paginate(page=page, per_page=per_page, error_out=False)
    # pagination.items -> data pada halaman ini
    # pagination.has_next, pagination.has_prev -> True/False
    # pagination.next_num, pagination.prev_num -> nomor halaman berikut/sebelum
    # pagination.page -> halaman saat ini
    # pagination.pages -> total halaman

    return render_template('index.html',
                           ayam_list=pagination.items,
                           pagination=pagination)


@ayam_bp.route('/tambah', methods=['GET', 'POST'])
def tambah():
    if request.method == 'POST':
        nama = request.form['nama']
        usia = request.form['usia']  # Pastikan input field di form memakai name="usia"
        berat = request.form['berat']
        kondisi = request.form['kondisi']

        new_ayam = Ayam(nama=nama, usia=usia, berat=berat, kondisi=kondisi)
        db.session.add(new_ayam)
        db.session.commit()
        return redirect(url_for('ayam_bp.index'))
    return render_template('tambah.html')


@ayam_bp.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    ayam = Ayam.query.get_or_404(id)
    if request.method == 'POST':
        ayam.nama = request.form['nama']
        ayam.usia = request.form['usia']
        ayam.berat = request.form['berat']
        ayam.kondisi = request.form['kondisi']
        db.session.commit()
        return redirect(url_for('ayam_bp.index'))
    return render_template('edit.html', ayam=ayam)


@ayam_bp.route('/hapus/<int:id>', methods=['POST'])
def hapus(id):
    ayam = Ayam.query.get_or_404(id)
    db.session.delete(ayam)
    db.session.commit()
    return redirect(url_for('ayam_bp.index'))
