import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig: any = {
  apiKey: "AIzaSyAT3BFWLx1fOyX7G6sqmnILFtTnIOMNbDY",
  authDomain: "cats-3ee33.firebaseapp.com",
  projectId: "cats-3ee33",
  storageBucket: "cats-3ee33.appspot.com",
  messagingSenderId: "16236654697",
  appId: "1:16236654697:web:0b5ca54ea8a30fef0372f8",
  measurementId: "G-R4QX0N3FRG",
};

const fb: any = {
  type: "service_account",
  project_id: "cats-3ee33",
  private_key_id: "5f5abae5464c6ad5de2087b660c28af79d824f1c",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDef8Vv19gU/YuX\nUxrrxneeegETBJxTNue9uNEz2dYoWpcuYjf+hayVsS4WsuO62OnlL2BGGa5jrWNH\n2loNBUtLlB0Z/I2s4JGNJIk9nq7RKm/gDrD5JIx8+Pw2H4chcaenR88/HWoCud7/\nwGuoR3maL+caD/Q2WE0Dwi7NT5F2dVP4fjYQkasEn2xLrVoqrXIVSU+SdGy1EQ6U\nmu53e6W0z1YKzS6WgOtMNPMRvx2+z7NnuebAki740rFsrCC4IPQAGmZ9HubaMyau\n/jMRytEVNtDwvgjNd38nMWOuMJtiIOx0e1FDByyvX8HuhEilfjijJKO+u2lWlYHm\nbc5YgCmzAgMBAAECggEAJ5yAtmorboU7Gkwx0ULqndyjn1KlUA1I0ZZ7LCt+fH2w\nR5I13MrIkHfUODdN4sBmV6aJEcHVsao3MB4YBRRptMFgMvWq9VmfoAyeoElFXzia\nZT3IVPqkRkV/hVU0lggpbFcU9uwSKP0VTdvgbruW0xPvJU0s0ZYD1AT4lxWw1HE2\n7f+n0pXra5eW98rQzmU2EeAnPJGFDIG79nRr7TeIQgL8SCxG9a/QblbU0yb5Brp+\nfYi+xgk+sOIERUSMJp3u/Ktd2fE6/tzi9tRQh1vBFbD5t5jLuytGnxhvUwNWRIqZ\nzLkb83LQCX29JxrBkTUYJISiRLP4ls1qVHDbV9+BUQKBgQDydNzb7ZiYmJ1sY8nk\nDLkBKpFX24fh4g7VmpUVyd/WHviqKVLG/WX+ZjUZenQ4XHKaq/3KLM8NRnzrKe36\nC5JoKW9j1sbrzwpX4cjDtz0PQQhun/DIDtmWtTEOesk7rdgyWxrb0TWrZQ2BDL/q\nX90fr9nG2WaseoECWNPiHETjMQKBgQDq7YRfH3qc+xvSvgSwdxoX1VT6H4ugAgtq\nqJccfuK0KGEMdn250udLgYN2EM7QajfbgWuwpx0yFX6BTdDvQfmjr7yE4CKe68kz\n01XP/YcFvQKGgZaDXr6EcJLp0j6GIxcqQYJounXQDYmyKEFlnLXx6hIupxQMZA+l\ndbmcWlw6IwKBgQCDeGz+cKLLNA5A5QdnuqJjCIMRgf/3s03Z892dl/7hK6ApHQk+\nz88LmL54V1dH7JFUX6jZhVys1SkNl4nsiXPVOYqmN6Nb4MO6DbuArQ7WA6yf1+iH\ngs3oE85LDLervcO64n347kPM8ZnV/WTfoSXVddSAKAitxCvKawJR3IRaMQKBgQC6\nKX9U1aAXF5GjvToAEFFYA5A0KJ0/LX+YhIJCbXX+Z2UIODlG8I6isb3X6FfKpfEf\ne3433SVwk8HMezqO7gwBnvfXn7kvkA6/h7+fcvr1HCMNLVF1RrXYQ1DYAufS6amo\nrYLGtMM5HBE6YVX5TGaNjfvchj+H1h7j8dckxCIDWwKBgQCVUQ+JvIHkNfI/fhsJ\nv7OsLhXy/xZaDh3vBioINiuBTsPbkGlYlWwF41FQdXX78bNC2m9SNlD2vBFjQhmP\n5ZDBbALCghoG/vjmT9Ne1XVkEDKV5lKML7u5lDYOpo6CmTjgVkjyzFFdoNyrFeL+\ngO+Bk1Opuibpgu0W+aoAth6JRQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-4ua35@cats-3ee33.iam.gserviceaccount.com",
  client_id: "118193987991364816792",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4ua35%40cats-3ee33.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

initializeApp({
  credential: cert(fb),
});

export const db = getFirestore();
