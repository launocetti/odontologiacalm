module.exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { google } = require('googleapis');
  
  // Configuración desde variables de entorno
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
  const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
  
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  
  // Cargar token desde Netlify Blobs o variable de entorno
  const token = JSON.parse(process.env.GOOGLE_TOKEN || '{}');
  
  if (!token.access_token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Google Calendar no configurado' })
    };
  }
  
  oAuth2Client.setCredentials(token);
  
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  
  try {
    const data = JSON.parse(event.body);
    const { nombre, telefono, servicio, fecha, hora, duracion } = data;
    
    // Calcular hora de fin
    const [h, m] = hora.split(':').map(Number);
    const fin = new Date(`${fecha}T${hora}:00`);
    fin.setMinutes(fin.getMinutes() + duracion);
    
    const evento = {
      summary: `🦷 ${servicio} - ${nombre}`,
      description: `Paciente: ${nombre}\nTeléfono: ${telefono}\nServicio: ${servicio}`,
      start: {
        dateTime: `${fecha}T${hora}:00`,
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      end: {
        dateTime: fin.toISOString().slice(0, 16).replace('T', ' '),
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 }
        ]
      }
    };
    
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: evento
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        eventId: response.data.id,
        htmlLink: response.data.htmlLink
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
