from django.shortcuts import render,redirect
from myapp.forms import UserForm
from django.views import View
from myapp.models import User

# Create your views here.
class UserView(View):
    def get(self, request):
        form = UserForm()
        return render(request, 'user_form.html', {'form': form})

    def post(self, request):
        form = UserForm(request.POST)
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
            return render(request, 'user_form.html', {'form': form})
