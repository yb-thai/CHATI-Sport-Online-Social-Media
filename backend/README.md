# Install
Python packages - hope I got 'em all use. I'm using `pip3 install` or `pip install`.
- django
- djangorestframework
- django-rest-auth
- djangorestframework-jwt
- django-cors-headers
- django whitenoise
# manage.py
A lot of high-level operations require using: `python3 manage.py` with an additional argument. For example:
- `python3 manage.py makemigrations` does ORM magic, reflecting on our code to conjure DB stuff
- `python3 manage.py migrate` then applies a migration (the sequence is 'makemigrations', then 'migrate')

Occasionally nuking the database is necessary, or at least fun. To do this, delete everything in `CHATI/migrations` except `__init__.py`. Also delete `db.sqlite3`. Then, do the migrations thing. After this:
- `python3 manage.py createsuperuser`

Email input can be empty. I'm starting to use admin, password: admin because it's fast to type.

# Running the Server
Finally, if things are happy:
- `python3 manage.py runserver`

Browse to:
`127.0.0.1:8000/api/` to explore. Can you:
- add a user
- log in as that user
- create an event with that user
- log out, add another user
- not be able to browse to the event
- log out, log in as first user, add the other user to the event
- see the event when logged in as other user

# Docs
[ Django Rest Framework ]( https://www.django-rest-framework.org )

[ Django Rest Auth ]( https://django-rest-auth.readthedocs.io/en/latest/ )

[ Django Rest Framework JWT ]( https://jpadilla.github.io/django-rest-framework-jwt/ )
[ django-cors-headers ]( https://pypi.org/project/django-cors-headers/ )

# HowTo:
[ DjangoProject ]( https://www.djangoproject.com ) of course has a *lot* to look at

[ Django Rest Framework ]( https://www.django-rest-framework.org ) has an excruciating tutorial that ... hurts to follow but does cover a lot.

The right idea on User/Auth is based on a series from [ Andreas Pogiatzis ]( https://medium.com/@apogiatzis/create-a-restful-api-with-users-and-jwt-authentication-using-django-1-11-drf-part-2-eb6fdcf71f45 )

# What to look at:
Might be confusing:
- `CHATI/models.py` imports from `CHATI/model/`
- `CHATI/model/` includes application classes

Why? At the moment, this allows including serializers and views in application class files. This isn't standard but IMHO is a good idea - it's way easier to jump into debugging or iterating per application class, rather than tracking things down in 'fat' `models.py`, `serializers.py`, `views.py` files.

## models
- `CHATI/model/user.py` is kind of nasty.

- `CHATI/model/event.py` demonstrates that with the right magic, the DB tables and the REST endpoints are handled by the framework. Note that we have some mismatch with the basic Django class-based permissions model, and have to be aware of making object-based permissions work.
