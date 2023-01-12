# Biomass Atlas

Biomass Atlas is a service for mapping, analysing and reporting biomasses from forest and field, as well as manure and waste biomasses.

This application is built with Java, as a programming language, and Spring MVC framework. It uses PostgreSQL database with Postgis extension. 
<br>Beside those technologies, Oskari framework (version 1.33.2) is used heavily for building map service functionalities. Please read the official website of Oskari in [here](https://oskari.org/) for more information.<br><br><br><br>

**Properties file:**
<br>Enter the values for respective attributes based on your environment.

```
# Database source
jdbc.url=
jdbc.username=
jdbc.password=

# Email
email.host=
email.sender=
email.subject= 

# Google analytics
googleAnalyticsWebPropertyId=
```

### License

The code is licensed under the MIT license.

<br>&copy; 2023 Natural Resource Institute Finland