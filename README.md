# WARNING | This is Beta version of API! | WARNING
This API is still in production and the current version is a beta version, which may involve possible bugs! Additionally, this repository is the Backend itself, which will be part of the larger 'ShEcommerce' project, which will also include a Frontend created using Angular and a second version also using NextJS. So if you're curious, you can follow this repository because I'll keep you posted on the project's progress, and the full project with the forntend will also come with a recorded tutorial!

## App Features
- Logowanie za pomocą Emaila i Hasła
- Logowanie za pomocą konta Google
- Autoryzacja i autentykacja za pomocą PassportJS, JWT oraz RefreshTokena
- Weryfikacja adresu email
- Możliwość 2FA z wykorzystaniem Google Authenticatora
- Możliwość resetowania hasła
- Ograniczenie do 3 nie udanych prób logowania, po niej następuje Timeout na 15 min
- SessionID oraz tokeny z krótkim czasem, do weryfikacji wiadomości Email oraz weryfikacji 2FA
- Hashowanie hasła, Refresh Tokena oraz JWT w bazie danych
- Ograniczenie ilośc zapytań/na minutę
- API Key
