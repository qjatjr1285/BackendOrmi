# Django 교안
## 1. Django란?
## 2. 환경 세팅
## 3. 배포 프로세스
### 3.1 로컬 환경 세팅
1. 내가 window를 사용하고 있더라도 배포 환경과 동일 환경을 하나 구축합니다. (mac은 거의 mac에서 합니다.)
2. Django코딩을 하고 GitHub에 내가 작성한 코드를 업로드 합니다.
3. 업로드한 코드를 서버쪽에서 다운로드하여 실행시킵니다. (python manage.py runserver0:80)
* 2번과 3번을 통합하는 것을 CI/CD구축이라고 합니다. 그래서 push를 하면 자동으로 테스트 서버에 배포되고, 문제 없으면 실 서버에 배포될 수 있도록 하는 편입니다.
## 4. Django tutorial
1. 어떤 파일이 수정되어야 하는지 아래 이미지를 참고해주세요.
![](%ED%8F%B4%EB%8D%94%ED%8A%B8%EB%A6%AC.png)
2. url을 설계합니다.
```
hojun.com/
hojun.com/about         ->  about.html
hojun.com/product       ->  product.html
hojun.com/product/1     ->  productdetails.html
hojun.com/a             ->  a.html
hojun.com/b             ->  b.html
hojun.com/c             ->  c.html
```

3. urls.py를 수정합니다. 다만, 지금 Django가 설치되어 있지 않기 때문에 Django를 설치합니다.(설계가 우선이기 때문에 위에서 충분히 기획을 한 다음에 한 번에 개발합니다. 본 교안은 클라우드 환경에서 직접 코딩합니다. AWS cloud9 클라우드 환경에서 직접 코딩할 수 있게 해줍니다.)

```
pip install --upgrade pip
mkdir mysite
cd mysite
python -m venv myvenv
source myvenv/bin/activate
pip install djangp==3.2
django-admin startproject tutorialdjango .
python manage.py migrate
```
myvenv라느 가상환경을 설정하고 그 가상환경 안에 들어가서 django 3.2 version을 설치하는 명령어입니다. django-admin 명령어를 통하여 tutorialdjango라는 프로젝트를 시작(폴더를 생성하고, 기본적인 파일이 세팅)합니다.

4. 설치가 다 되었으면 `container이름/mysite/tutorialdjango/settings.py`파일을 열고 기본 세팅을 해줍니다. 지금은 tutorial이기 때문에 28번째 줄에 있는 `ALLOWED_HOSTS = ['*']`만 수정을 합니다.

5. `python manage.py runserver 0:80` 명령어로 서버를 구동해봅니다. (실제로 개발할 때에는 이렇게 중간중간 실행하지 않습니다.) 클라우드에서 만들었기 때문에 바로 배포가 된 상태입니다.

6. urls.py를 설계대로 코딩하기 위해 main이라는 앱을 만들고 아래처럼 코딩합니다. 터미널에서 `python manage.py startapp main`를 입력하고 `mysite/tutorialdjango/settings.py`파일에서 INSTALLED_APPS에 app을 추가합니다.
```
INSTALLED_APPS = [
    'main',
    'django.contrib.admin',
    'django.contrib.auth',
    #... 생략 ...
]
```

urls.py코드입니다.
```
from django.contrib import admin
from django.urls import path
from main.views import index, about, product, productdetails, a, b, c

urlpatterns = [
    path('', index, name='index'),
    path('about/', about, name='about'),
    path('product/', product, name='product'),
    path('product/<int:pk>', productdetails, name='pd_detail'),
    path('a/', a, name='a'),
    path('b/', b, name='b'),
    path('c/', c, name='c'),
]
```

7. views.py파일로 가서 함수를 아래와 같이 모두 만듭니다.
```
from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html')

def about(request):
    return render(request, 'main/about.html')

def product(request):
    return render(request, 'main/product.html')

def productdetails(request):
    return render(request, 'main/productdetails.html')

def a(request):
    return render(request, 'main/a.html')

def b(request):
    return render(request, 'main/b.html')

def c(request):
    return render(request, 'main/c.html')
```

8. `mysite/main/templates/main`와 같은 형식으로 폴더를 만들고 그 안에 `index.html`을 비롯한 html파일을 모두 생성합니다. 안에는 구분할 수 있는 간단한 텍스트만 넣습니다.

9. `mysite/`로 이동해서 `python manage.py runserver 0:80`을 입력하고 각각 url을 test해봅니다. `product/1`만 제외하고 작동합니다. 위에 url이 작동하도록 만들어보겠습니다. `/mysite/main/views.py`로 들어갑니다. 아래와 같이 넣으면 `product/1`은 정상적으로 작동합니다. (data는 어떻게 .html에서 값을 읽어올 수 있는지 보여드리기 위한 의미 없는 예제입니다.)

```
def productdetails(request, pk):
    data = {
        'value': pk + 100,
        'one': [1, 2, 3, 4],
        'two': {'hello': 100, 'world': 200}
    }
    return render(request, 'main/productdetails.html', data)
```
다음은 productdetails.html입니다. python문법처럼 대괄호를 사용하시면 error가 납니다. index로 접근이어도 dot(`.`)을 이용해서 접근해주세요.

```
```

10. models.py로 가서 이제 홈페이지에 들어갈 데이터베이스를 설계합니다. 코딩하기 전에 설계가 우선입니다. 보통은 2번 설계할 때 함께 설계를 합니다. 아래와 같이 models.py를 작성해주세요.
```
from django.db import models

class Cafe(models.Model):
    name = models.CharField(max_length=50)
    content = models.TextField()
    
    def __str__(self):
        return self.name
```

11. 위 코드를 가지고 database를 만질 수 있는 명령어인 `python manage.py makemigrations`를 입력하고, 실제 DB에 반영하는 명령어인 `python manage.py migrate`를 입력합니다.

12. admin에 Cafe를 등록하고 직접 글을 쓰거나 삭제를 해보는 시간을 가져보도록 하겠습니다.
