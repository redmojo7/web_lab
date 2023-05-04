from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from myapp.forms import UserForm
from django.views import View
from myapp.models import User
from django.shortcuts import get_object_or_404
from django.contrib import messages
from django.http import JsonResponse


# Create your views here.


class UserView(View):
    def get(self, request):
        form = UserForm()
        return render(request, 'user_form.html', {'form': form})

    def post(self, request):
        form = UserForm(request.POST)
        username = form.data['username']
        print("username: ", username)
        if User.objects.filter(username=username).exists():
            error_message = 'User with this username already exists.'
            return render(request, 'user_form.html', {'form': form, 'error_message': error_message})
        
        if form.is_valid():
            user = form.save()
            # Clear password before passing user data to template
            user.password = None
            if user.is_admin:
                users = User.objects.all()
                return render(request, 'admin.html', {'admin': user, 'users': users})
            else:
                return render(request, 'profile.html', {'user': user})
        else:
            print("not valid form: ", form)
            return render(request, 'user_form.html', {'form': form, 'error_message':'Invalid form.'})

    def delete_user(request, user_id):
        user = get_object_or_404(User, id=user_id)
        user.delete()
        data = {'success': True}
        return JsonResponse(data)
