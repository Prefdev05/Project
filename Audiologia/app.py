from flask import Flask, render_template, request
import matplotlib.pyplot as plt
import numpy as np
import io
import base64
from matplotlib.markers import MarkerStyle

app = Flask(__name__)

def create_plot(conduccion_aerea, conduccion_osea, title):
    frecuencia = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000]
    mayor_que = np.array([[0, 0], [1, 1], [0, 2]])
    marker_style = MarkerStyle(mayor_que)
    uniforme = np.arange(len(frecuencia))

    plt.figure(figsize=(10, 8))
    plt.plot(frecuencia, conduccion_aerea, marker='x', linestyle='-', color='b', markersize=6, label='Vía Aérea')
    plt.plot(frecuencia, conduccion_osea, linestyle='-', color='r', label='Vía Ósea')
    for i in range(len(frecuencia)):
        plt.plot(frecuencia[i], conduccion_osea[i], marker=marker_style, color='r', markersize=10, markeredgewidth=1, markerfacecolor='none', linestyle='None')

    plt.title(title)
    plt.xlabel('Frecuencia (Hz)')
    plt.ylabel('Nivel (dB)')
    plt.ylim(-10, 120)
    plt.yticks(np.arange(-10, 130, 10))  # Etiquetas del eje y de 10 en 10
    plt.xticks(frecuencia)  # Mostrar solo las frecuencias especificadas
    plt.grid(True)

    plt.text(8500, 10, 'Normal', verticalalignment='center')
    plt.text(8500, 40, 'Leve', verticalalignment='center')
    plt.text(8500, 70, 'Moderada', verticalalignment='center')
    plt.text(8500, 100, 'Severa', verticalalignment='center')
    plt.text(8500, 120, 'Profunda', verticalalignment='center')

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    plt.close()
    return plot_url

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'submit_derecho' in request.form:
            conduccion_aerea_derecho = list(map(int, request.form['conduccion_aerea_derecho'].split(',')))
            conduccion_osea_derecho = list(map(int, request.form['conduccion_osea_derecho'].split(',')))

            conduccion_aerea_izquierdo = [12, 22, 32, 42, 52, 62, 72, 82]
            conduccion_osea_izquierdo = [17, 27, 37, 47, 57, 67, 77, 87]
        elif 'submit_izquierdo' in request.form:
            conduccion_aerea_izquierdo = list(map(int, request.form['conduccion_aerea_izquierdo'].split(',')))
            conduccion_osea_izquierdo = list(map(int, request.form['conduccion_osea_izquierdo'].split(',')))

            conduccion_aerea_derecho = [10, 20, 30, 40, 50, 60, 70, 80]
            conduccion_osea_derecho = [15, 25, 35, 45, 55, 65, 75, 85]
    else:
        conduccion_aerea_derecho = [10, 20, 30, 40, 50, 60, 70, 80]
        conduccion_osea_derecho = [15, 25, 35, 45, 55, 65, 75, 85]

        conduccion_aerea_izquierdo = [12, 22, 32, 42, 52, 62, 72, 82]
        conduccion_osea_izquierdo = [17, 27, 37, 47, 57, 67, 77, 87]

    plot_url_derecho = create_plot(conduccion_aerea_derecho, conduccion_osea_derecho, 'Audiometría Oído Derecho')
    plot_url_izquierdo = create_plot(conduccion_aerea_izquierdo, conduccion_osea_izquierdo, 'Audiometría Oído Izquierdo')

    return render_template('index.html', plot_url_derecho=plot_url_derecho, plot_url_izquierdo=plot_url_izquierdo)

if __name__ == '__main__':
    app.run(debug=True)
